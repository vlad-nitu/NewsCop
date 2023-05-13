from datetime import datetime
from django.shortcuts import render
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
        url_exists = db.nd_collection.find_one( { '_id': url } ) is not None

        # If current URL is not part of the database, persist it
        if not url_exists:
            # do crawling on the given url
            article_text, article_date = crawl_url(url)

            # print(compute_fingerprint(article_text))
            newsdoc = NewsDocument(url=url, published_date=article_date, fingerprints=compute_fingerprint(article_text))
            newsdoc.save()

        print("persist_url_view: " + url)
        return HttpResponse(url)
    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")
    

def url_similarity_checker(request):
    #  Ensure the request method is POST
    if request.method == 'POST':
        
        # Persist the submitted URL
        url = str(persist_url_view(request).content)
        url = url[2 : len(url) - 1]
        
        # Get the fingerprints for the current URL
        submitted_url_fingerprints = db.nd_collection.find_one( { '_id': url } )['fingerprints']

        # List of candidates
        # Candidate: id, published_date, fingerprints
        candidates = []
        
        i = 0

        for fingerprint in submitted_url_fingerprints:
            print("Current fingerprint: " + str(i))
            i+=1

            # Get current shingle hash value
            curr_hash = fingerprint['shingle_hash']

            # Get all documents that contain this shingle hash
            candidates_for_curr_hash = db.nd_collection.find({'fingerprints.shingle_hash': curr_hash})

            # Add found documents to the "candidates" list
            candidates.extend(candidates_for_curr_hash)

        high_similarity_article = None
        high_similarity_threshold = 1e-4

        # Remove duplicates from the candidates list
        candidates = list({candidate['_id']: candidate for candidate in candidates}.values())

        i = 0

        for candidate in candidates:
            if candidate['_id'] == url:
                continue
            
            print("candidate no. " + str(i))
            i+=1
            similarity = compute_similarity(submitted_url_fingerprints, candidate['fingerprints'])
            if similarity >= high_similarity_threshold:
                high_similarity_article = candidate['_id']
                break

        body = None

        if high_similarity_article is not None:
            body = (True, high_similarity_article)
        else:
            body = (False, high_similarity_article)

        return HttpResponse(body, status=200)

    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")
