import concurrent.futures
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
# from plagiarism_checker.crawling import crawl_url
from .plagiarism_checker.fingerprinting import compute_fingerprint
from .plagiarism_checker.crawling import crawl_url
from .plagiarism_checker.sanitizing import sanitizing_url
from .plagiarism_checker.similarity import compute_similarity
import multiprocessing
import time
from collections import Counter


# Create your views here.
class ReactView(APIView):
    serializer_class = ReactSerializer

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


def find_max_count_string(strings):
    counter = Counter(strings)
    max_count = max(counter.values())
    max_strings = [string for string, count in counter.items() if count == max_count]
    return max_strings, max_count


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

        # check if the given url is indeed valid
        if not sanitizing_url(url):
            return HttpResponseBadRequest("The url provided is invalid")

        # Check whether the current URL is present in the database
        url_exists = db.rares_news_collection.find_one({'_id': url}) is not None

        # If current URL is not part of the database, persist it
        if not url_exists:
            # do crawling on the given url
            article_text, article_date = crawl_url(url)

            fingerprints = compute_fingerprint(article_text)
            only_shingle_values = [i['shingle_hash'] for i in fingerprints]
            # print(only_shingle_values)
            newsdoc = NewsDocument(url=url, published_date=article_date, fingerprints=only_shingle_values)
            newsdoc.save()

        print("persist_url_view: " + url)
        return HttpResponse(url, status=200)
    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")


def process_document(url_helper, length_first, string_list):
    document = db.rares_news_collection.find_one({'_id': url_helper})
    if (document is not None and 'fingerprints' in document):
        second = len(set(document['fingerprints']))
        inters = string_list[url_helper]
        comp = inters / (second + length_first - inters)
        return (url_helper, comp)
    return None


def url_similarity_checker(request):
    #  Ensure the request method is POST
    if request.method == 'POST':

        # Retrieve the URL from the request body
        url = json.loads(request.body)["key"]

        # If the URL has not been persisted yet, persist it in the DB
        if (db.rares_news_collection.find_one({'_id': url}) is None):
            persist_url_view(request)

        # Get the fingerprints for the current URL
        submitted_url_fingerprints = db.rares_news_collection.find_one({'_id': url})['fingerprints']

        # Get the length of the fingerprints for later use when computing Jaccard Similarity
        visited = set()  # visited hashes

        # Get the length of the fingerprints for later use when computing Jaccard Similarity
        length_first = len(set(submitted_url_fingerprints))

        # First query to find candidates and prefilter to only consider "informative hashes"
        query = {
            "_id": {"$in": submitted_url_fingerprints},
            "$expr": {"$lte": [{"$size": "$hashes"}, 20]}
        }
        projection = {'_id': 1}
        matching_documents = db.rares_hashes.find(query, projection)
        candidates = [i['_id'] for i in matching_documents]

        # Second query to find only the candidates after filtering
        query = {
            "_id": {"$in": candidates},
            "hashes": {"$exists": True}
        }
        matching_documents = db.rares_hashes.find(query)

        string_list = {}
        for document in matching_documents:
            hashes = document["hashes"]
            for x in hashes:
                if x != url:
                    visited.add(x)
                    string_list[x] = string_list.get(x, 0) + 1

        fing_size = {}

        with concurrent.futures.ThreadPoolExecutor() as executor:
            # Submit tasks for processing documents
            futures = [
                executor.submit(partial(process_document, length_first=length_first, string_list=string_list), document)
                for document in matching_documents]

        # pool = multiprocessing.Pool()
        # results = pool.map(partial(process_document, length_first=length_first, string_list=string_list), visited)
        # pool.close()
        # pool.join()
        max_val = -1
        max_url = ''

        for result in futures:
            if result is not None:
                url_helper, comp = result
                fing_size[url_helper] = comp
                if comp > max_val:
                    max_val = comp
                    max_url = url_helper

        return HttpResponse((max_url, max_val), status=200)

    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")
