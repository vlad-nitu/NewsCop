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
import multiprocessing
import time


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
        url_exists = db.nd_collection.find_one({'_id': url}) is not None

        # If current URL is not part of the database, persist it
        if not url_exists:
            # do crawling on the given url
            article_text, article_date = crawl_url(url)

            # print(compute_fingerprint(article_text))
            newsdoc = NewsDocument(url=url, published_date=article_date, fingerprints=compute_fingerprint(article_text))
            newsdoc.save()

        print("persist_url_view: " + url)
        return HttpResponse(url, status=200)
    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")


def collect_and_save_documents_that_contain_a_specific_hash(results_queue, submitted_url_fingerprints, i):

    print(f"Batch: {i}.")
    for fingerprint in submitted_url_fingerprints:

        # Get current shingle hash value
        curr_hash = fingerprint['shingle_hash']

        # Get all documents that contain this shingle hash
        candidates_for_curr_hash = db.nd_collection.find({'fingerprints.shingle_hash': curr_hash}, {'_id': 1})

        # print(f"Size of queue: {results_queue.qsize()}")

        # for candidate in candidates_for_curr_hash:
        #     results_queue.put(candidate)

    print(f"Finished batch: {i}.")


def compute_candidates(results_queue, NUM_PROC, candidates, submitted_url_fingerprints):
    # Start the timer
    start_time = time.time()

    divided_submitted_url_fingerprints = []
    n = len(submitted_url_fingerprints) / NUM_PROC
    for i in range(NUM_PROC):
        divided_submitted_url_fingerprints.append(submitted_url_fingerprints[int(i * n) : int((i+1) * n)])

    for i in range(NUM_PROC):
        process = multiprocessing.Process(target=collect_and_save_documents_that_contain_a_specific_hash,
                                            args=(results_queue, divided_submitted_url_fingerprints[i], i))
        candidates.append(process)

    for j in candidates:
        j.start()

    for j in candidates:
        j.join()

    # Calculate the elapsed time
    elapsed_time = time.time() - start_time

    # Print the elapsed time
    print(f"Elapsed time: {elapsed_time} seconds")


def url_similarity_checker(request):
    #  Ensure the request method is POST
    if request.method == 'POST':

        # Persist the submitted URL
        url = str(persist_url_view(request).content)

        # Filter the received URL
        url = url[2: len(url) - 1]

        # Get the fingerprints for the current URL
        submitted_url_fingerprints = db.nd_collection.find_one({'_id': url})['fingerprints']

        NUM_PROC = 16

        # List of candidates
        # Candidate: id
        candidates = []

        # Initialize the shared queue
        results_queue = multiprocessing.Queue()

        print("Ready to find candidates")

        compute_candidates(results_queue, NUM_PROC, candidates, submitted_url_fingerprints)

        high_similarity_article = None
        high_similarity_threshold = 1e-4

        i = 0

        while not results_queue.empty():
            candidate = results_queue.get()
            if candidate['_id'] == url:
                continue

            print("candidate no. " + str(i))
            i += 1

            candidate = db.nd_collection.find_one({'_id': candidate['_id']})

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
