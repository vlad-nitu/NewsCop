from django.db import models
from utils import db

# Create your models here.
class React(models.Model):
    news = models.CharField(max_length = 30) 
    detail = models.CharField(max_length = 400)

    def save(self, *args, **kwargs):
        db.test_collection.insert_one({
            'news': self.news,
            'detail': self.detail,
        })
