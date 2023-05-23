"""
URL configuration for news_articles project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ReactView.as_view(), name = "main_view"),
    path('try/<str:url>/', try_view, name = "try"),
    path('reqex/', reqex_view, name = "reqex"),
    path('persistURL/', persist_url_view, name = "persist_url"),
    path('urlsimilarity/', url_similarity_checker, name = "url_similarity_checker"),
    path('compareTexts/', compare_texts_view, name = "compare_texts"),
    path('compareURLs/', compare_URLs, name = "compare_URLs")
    # Set localhost on port 8000 (default for Django)  to be the main endpoint for ReactView class 
]
