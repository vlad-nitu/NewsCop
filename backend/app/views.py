from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

# Create your views here.
class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        obtained = [{'_id': output['_id'], 'date_field': output['date_field']} for output in db.copy_collection.find()]
        return Response(obtained)

    def post(self, request):
        srlzr = ReactSerializer(data=request.data)  # Pass data to React serializer method

        if srlzr.is_valid(raise_exception=True):
            srlzr.save()

        return Response(srlzr.data)
