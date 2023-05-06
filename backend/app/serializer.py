# Used to convert complex data to native Python data types, 
# which will be then rendered to JSON that will be used on client-side (by React) 
from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import *

class ReactSerializer(DocumentSerializer):
    class Meta:
        model = React
        fields = ['_id', 'date_field']
