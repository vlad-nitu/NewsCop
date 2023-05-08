from datetime import datetime
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from django.http import HttpResponse, HttpResponseBadRequest
import json
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self, request):
        obtained = [{'url': output['_id'], 'published_date': output['published_date']}
                    for output in db.copy_collection.find()]
        return Response(obtained)

    def post(self, request):
        srlzr = ReactSerializer(data=request.data)  # Pass data to React serializer method

        if srlzr.is_valid(raise_exception=True):
            srlzr.save()

        return Response(srlzr.data)


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


def persist_url_view(request, url):
    '''
    The endpoint that can be consumed by posting on localhost:8000/persistURL/<urlString>/. This will be used
    for the persist functionality of URLs.
    :param request: the request
    :param url: the string path variable, which represents the URL
    :return: a HttpResponse with status 200, if successful else HttpResponseBadRequest with status 400
    '''

    #  Ensure the request method is POST
    if request.method == 'POST':
        try:
            the_url = json.loads('{ "url"' + ": " + '"' + url + '"' + "}")
            #  Serialises the url into a json
            fp1 = Fingerprint(shingle_hash=3, shingle_position=5)
            fp2 = Fingerprint(shingle_hash=6, shingle_position=10)
            newsdoc = NewsDocument(url=url, published_date=datetime.now(), fingerprints=[fp1, fp2])
            newsdoc.save()
            return HttpResponse(newsdoc.url)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON data")
    else:
        return HttpResponseBadRequest(f"Expected POST, but got {request.method} instead")
