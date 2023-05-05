from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

# Create your views here.
class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        obtained = [{'news': output.news, 'detail': output.detail} for output in React.objects.all()]
        return Response(obtained)

    def post(self, request):
        srlzr = ReactSerializer(data=request.data)  # Pass data to React serializer method
        if srlzr.is_valid(raise_exception=True):
            srlzr.save()
        return Response(srlzr.data)
