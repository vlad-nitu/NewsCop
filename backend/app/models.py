from django.db import models

# Create your models here.
class React(models.Model):
    news = models.CharField(max_length = 30) 
    detail = models.CharField(max_length = 400)
