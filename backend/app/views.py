from silk.profiling.profiler import silk_profile

import concurrent.futures
import heapq
from datetime import datetime
from functools import partial

import numpy as np
from django.shortcuts import render
from numpy import str_
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from django.http import HttpResponse, HttpResponseBadRequest
import json
from django.views.decorators.csrf import csrf_exempt
from .plagiarism_checker.fingerprinting import compute_fingerprint
from .plagiarism_checker.crawling import crawl_url, extract_data_from_url
from .plagiarism_checker.sanitizing import sanitizing_url
from .plagiarism_checker.similarity import compute_similarity
from .response_entities import ResponseUrlEntity, ResponseUrlEncoder, ResponseTwoUrlsEntity, ResponseTwoUrlsEncoder
from .response_statistics import ResponseStatisticsEncoder

import multiprocessing
import time
from .plagiarism_checker.similarity import compute_similarity
from .handlers import *

from collections import Counter, defaultdict

from utils import statistics

# Create your views here.
class ReactView(APIView):
    serializer_class = ReactSerializer

    @silk_profile(name='View GET')
    def get(self, request):
        obtained = [{'url': output['_id'], 'published_date': output['published_date']}
                    for output in db.copy_collection.find()]
        return Response(obtained, status=200)

    def post(self, request):
        srlzr = ReactSerializer(data=request.data)  # Pass data to React serializer method

        if srlzr.is_valid(raise_exception=True):
            srlzr.save()

        return Response(srlzr.data, status=200)


def try_view(request, url):
    '''
    Example endpoint that can be consumed by requesting localhost:8000/try/<string>/
    :param request: the request
    :param url: the string path variable
    :return: a HttpResponse with status 200, if successful else HttpResponseBadRequest
    '''
    if (request.method == 'GET'):
        return HttpResponse("You entered " + url, status=200)
    else:
        return HttpResponseBadRequest("Endpoint called with something different than GET")


def reqex_view(request):
    '''
    Example endpoint that can be consumed by posting a json object under
    localhost:8000/reqex/.
    :param request: the request
    :return: a HttpResponse with status 200 if successful, else a HttpBadRequest with status 400.
    '''
    #  Ensure the request method is POST
    if request.method == 'POST':
        #  Retrieve the request body data
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON data")

        return HttpResponse("Example response " + data["key"], status=200)
    else:
        return HttpResponseBadRequest("Invalid request method")


@silk_profile(name='Persist_URL GET')
def persist_url_view(request):
    '''
    The endpoint that can be consumed by posting on localhost:8000/persistURL/ with the request body as <urlString>.
    This will be used for the persist functionality of URLs.
    :param request: the request
    :return: a HttpResponse with status 200, if successful else HttpResponseBadRequest with status 400
    '''

    #  Ensure the request method is POST
    if request.method == 'POST':
        #  Serialises the url into a json => use request body instead of path variable
        url = json.loads(request.body)["key"]

        # create the chain for persisting a URL and put the URL through this chain
        return persist_chain(url)
    else:
        return HttpResponseBadRequest(f'Expected POST, but got {request.method} instead')


def process_document(url_helper, length_first, string_list):
    '''
    Helper function that is used to process tasks in parallel for
    computing the jaccard similarity between the candidate urls and the input url.
    :param url_helper: the candidate url
    :param length_first: the fingerprint size of the input url
    :param string_list: the frequency count
    :return: the url and its jaccard similarity with the input url
    '''
    document = db.news_collection.find_one({'_id': url_helper})
    if (document is not None and 'fingerprints' in document):
        length_second = len(set(document['fingerprints']))
        inters = string_list[url_helper]
        comp = inters / (length_second + length_first - inters)
        return url_helper, comp
    else:
        return '', -1


def url_similarity_checker(request):
    '''
    The endpoint that will be used in the CheckURL page.
    :param request: the request body.
    :return: a HTTP response with status 200, and a pair of url and jaccard similarity,
    with this url being the most similar to the input url present in the request body
    '''
    #  Ensure the request method is POST
    if request.method == 'POST':

        # Retrieve the URL from the request body
        source_url = json.loads(request.body)["key"]

        # If the URL has not been persisted yet, persist it in the DB
        if db.news_collection.find_one({'_id': source_url}) is None:
            response = persist_url_view(request)
            if response.status_code == 400:  # Cannot persist URL as either it is too long, or it does not have text.
                return response

        # Get the fingerprints for the current URL
        submitted_url_fingerprints = db.news_collection.find_one({'_id': source_url})['fingerprints']

        return find_similar_documents_by_fingerprints(submitted_url_fingerprints, source_url)

    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")


def text_similarity_checker(request):
    '''
    The endpoint that will be used in the CheckText page.
    :param request: the request body.
    :return: a HTTP response with status 200, and a pair of url and jaccard similarity,
    with this url being the most similar to the input text present in the request body
    '''
    #  Ensure the request method is POST
    if request.method == 'POST':

        # Retrieve the text from the request body
        text = json.loads(request.body)["key"]

        # verify if text is empty
        if len(text) == 0:
            return HttpResponseBadRequest("The article provided has no text.")

        # Compute fingerprints of the text given
        text_fingerprints = [fp['shingle_hash'] for fp in compute_fingerprint(text)]

        # verify if it has more than 2000 hashes
        if len(text_fingerprints) > 2000:
            return HttpResponseBadRequest("The article given has exceeded the maximum size supported.")

        return find_similar_documents_by_fingerprints(text_fingerprints)

    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")


def find_similar_documents_by_fingerprints(fingerprints, input=''):
    '''
    Helper method which is used by the two endpoints /checkText and /checkURL for doing query on the database
    :fingerprints: the fingerprints computed for the text/url input given by the user
    :input: for /checkURL is the url provided by the user, so we do not consider it when computing the similarities
    for /checkText is the empty string as we do not have any URL to check it against
    :return: HttpResponse with the five most similar articles in decreasing order of similarity magnitude
    '''
    # Get the length of the fingerprints for later use when computing Jaccard Similarity
    visited = set()  # visited hashes

    # Get the length of the fingerprints for later use when computing Jaccard Similarity
    length_first = len(set(fingerprints))

    # First query to find candidates and prefilter to only consider "informative hashes"
    query = {
        "_id": {"$in": fingerprints},
        "$expr": {"$lte": [{"$size": "$urls"}, 21]}
    }
    projection = {'_id': 1}
    matching_documents = db.hashes_collection.find(query, projection)
    candidates = [document['_id'] for document in matching_documents]

    # Second query to find only the candidates after filtering
    query = {
        "_id": {"$in": candidates},
        "urls": {"$exists": True}
    }
    matching_documents = db.hashes_collection.find(query)
    string_list = defaultdict(int)

    # construct the map (url, nr of occurrences of the url)
    for document in matching_documents:
        urls = document["urls"]
        for url in urls:
            if url != input:
                visited.add(url)
                string_list[url] += 1
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit tasks for processing urls
        futures = [
            executor.submit(partial(process_document, length_first=length_first, string_list=string_list),
                            helper_url)
            for helper_url in visited]

    heap = []
    capacity = 10

    for future in concurrent.futures.as_completed(futures):
        result = future.result()
        if result[0] != '':
            article_url, computed_similarity = result

            if len(heap) < capacity:
                heapq.heappush(heap, (computed_similarity, article_url))
            else:
                # Equivalent to a pop, then a push, but faster
                if computed_similarity > heap[0][0]:
                    heapq.heapreplace(heap, (computed_similarity, article_url))

    # construct the response entity
    response = []
    for (similarity, url) in heapq.nlargest(len(heap), heap):
        title, publisher, date = extract_data_from_url(url)
        if title is not None and publisher is not None:
            response.append(ResponseUrlEntity(url, similarity, title, publisher, date))

    if input != '':
        # This is a URL check query, thus we need to updated the statistics
        statistics.increment_performed_queries()
        similarities = [0, 0, 0, 0, 0]
        for resp in response:
            sim = round(resp.similarity * 100)
            index = sim // 20
            similarities[index] = similarities[index] + 1
        statistics.add_similarities_retrieved(similarities)

    source_title, _, source_date = extract_data_from_url(input)
    request_response = {
        'sourceTitle': source_title,
        'sourceDate': source_date,
        'similarArticles': response
    }

    return HttpResponse(json.dumps(request_response, cls=ResponseUrlEncoder), status=200,
                        content_type="application/json")


def compare_texts_view(request):
    '''
    The endpoint that can be consumed by posting on localhost:8000/compareTexts/ having two texts attached in the body
    of the request
    This will be used for computing the similarity between the two texts
    :param request: the request
    :return: a HttpResponse with status 200 and the computed similarity, if successful
    else HttpResponseBadRequest with status 400
    '''

    #  Ensure the request method is POST
    if request.method == 'POST':
        data = json.loads(request.body)

        # extract the two texts from the request
        text1 = data["original_text"]
        text2 = data["compare_text"]

        # compute the fingerprints of the two texts
        fingerprint1 = compute_fingerprint(text1)
        fingerprint2 = compute_fingerprint(text2)

        # compute and return the similarity between the two texts
        return HttpResponse(compute_similarity(fingerprint1, fingerprint2))
    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")


def compare_URLs(request):
    '''
    The endpoint that can be consumed by posting on localhost:8000/compareURLs/ with the request body
    containing two URL strings.
    This will be used for the similarity computation between two given URLs.
    :param request: the request
    :return: a HttpResponse with status 200, if successful else HttpResponseBadRequest with status 400
    '''

    #  Ensure the request method is POST
    if request.method == 'POST':
        #  Serialises the url into a json => use request body instead of path variable
        url_left = json.loads(request.body)["url_left"]
        url_right = json.loads(request.body)["url_right"]

        # check if the given left url is indeed valid
        if not sanitizing_url(url_left):
            return HttpResponseBadRequest("The original url provided is invalid.")

        # check if the given right url is indeed valid
        if not sanitizing_url(url_right):
            return HttpResponseBadRequest("The changed url provided is invalid.")

        # do crawling on the given urls
        article_text_left, date_left = crawl_url(url_left)
        article_text_right, date_right = crawl_url(url_right)

        # compute fingerprints for both urls
        fingerprint_left = compute_fingerprint(article_text_left)
        fingerprint_right = compute_fingerprint(article_text_right)
        result_similarity = compute_similarity(fingerprint_left, fingerprint_right)
        if date_left is None or date_right is None:  # In this case we cannot compare dates => ownership = 0
            return construct_response_helper(result_similarity, 0, date_left, date_right)
        if date_left <= date_right:
            # The left input is likely to own the content
            return construct_response_helper(result_similarity, 1, date_left, date_right)
        else:
            # The right input is likely to own the content
            return construct_response_helper(result_similarity, 2, date_left, date_right)
    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")


def construct_response_helper(similarity, ownership, date_left, date_right):
    """
    In order not to avoid code duplication, we made this helper function to return a response entity
    according to the parameters.
    :param date_right: date of the left input
    :param date_left: date of the right input
    :param similarity: the similarity between the articles
    :param ownership: the ownership value
    :return: an HTTP response with the correct parameters
    """
    return HttpResponse(
        ResponseTwoUrlsEncoder().encode(
            ResponseTwoUrlsEntity(similarity=similarity, ownership=ownership, left_date=str(date_left),
                                  right_date=str(date_right))),
        status=200, content_type="application/json")

def update_users(request):
    """
    This method is called by the frontend whenever a user starts the application.
    It updates the number of users that.
    :param request: the request
    :return: an HTTP response with status 200 if the request was successful else HttpResponseBadRequest
    """
    if request.method == 'POST':
        statistics.increment_users()
        return HttpResponse("Users were successfully updated", status=200)
    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")

def retrieve_statistics(request):
    '''
    Endpoint
    :param request: the request
    :return: a HttpResponse with status 200, if successful else HttpResponseBadRequest
    '''
    if (request.method == 'GET'):
        articles = db.news_collection.count_documents({})
        statistics.set_stored_articles(articles)
        return HttpResponse(ResponseStatisticsEncoder().encode(statistics), status=200, content_type="application/json")
    else:
        return HttpResponseBadRequest(f"Expected GET, but got {request.method} instead")
