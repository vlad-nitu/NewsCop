# Used to convert complex data to native Python data types, 
# which will be then rendered to JSON that will be used on client-side (by React) 

from rest_framework import serializers
from .models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['news', 'detail'] 
