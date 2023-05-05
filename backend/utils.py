import pymongo
from django.conf import settings

client = pymongo.MongoClient(
    settings.DATABASES['default']['CLIENT']['host'],
    username=settings.DATABASES['default']['CLIENT']['username'],
    password=settings.DATABASES['default']['CLIENT']['password']
)

db = client[settings.DATABASES['default']['NAME']]
