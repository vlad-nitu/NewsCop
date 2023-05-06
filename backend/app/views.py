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
    # Ensure the request method is POST
    if request.method == 'POST':
        # Retrieve the request body data
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON data")

        return HttpResponse("Example response " + data["key"])
    else:
        return HttpResponseBadRequest("Invalid request method")

def persist_url_view(request, url):
    ''' TODO: Change
    Example endpoint that can be consumed by requesting localhost:8000/try/<string>/
    :param request: the reques
    :param url: the string path variable
    :return: a HttpResponse with status 200, if successful else HttpResponseBadRequest
    '''

    # Ensure the request method is POST
    if request.method == 'POST':
        print("DA: " + url)

        dummy_fp = Fingerprint(shingle_hash=3, shingle_position=5)
        srlzr = NewsDocumentSerializer(dummy_fp, data=url)

        if srlzr.is_valid(raise_exception=True):
            srlzr.save()

        return Response(srlzr.data)

    else:
        return HttpResponseBadRequest("Invalid request method")
