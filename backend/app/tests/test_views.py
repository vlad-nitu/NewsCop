import json
import time
from unittest.mock import patch
from unittest.mock import MagicMock

from django.test import TestCase, RequestFactory
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status

from app.views import compare_texts_view
from app.views import persist_url_view
from app.views import try_view
from app.views import reqex_view
from app.views import url_similarity_checker
from app.views import compare_URLs
from app.views import text_similarity_checker

from utils import db
import sys


class TestPersistUrlView(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_post_request_compare_texts(self):
        # create the request body
        data = {
            'original_text': 'A do run run run, a do run run',
            'compare_text': 'run run',
        }

        json_data = json.dumps(data)
        request = self.factory.post("/compareTexts/", data=json_data, content_type='application/json')

        response = compare_texts_view(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), str(0.0))

    def test_post_request_with_valid_url_no_text(self):
        url = 'https://www.bbc.com/news/world-asia-65657996'
        # clear database
        db.news_collection.delete_one({'_id': url})

        # create the request body
        data = {
            'key': url,
        }
        json_data = json.dumps(data)
        request = self.factory.post("/persistURL/", data=json_data, content_type='application/json')

        response = persist_url_view(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), url)
        res = db.news_collection.delete_one({'_id': url})
        self.assertEqual(res.deleted_count, 1)
        db.hashes_collection.delete_many({'urls': url})

    def test_post_request_with_valid_url_text(self):
        url = 'https://www.bbc.com/news/world-asia-65657996'

        # clear database
        db.news_collection.delete_one({'_id': url})

        # create the request body
        data = {
            'key': url,
        }
        json_data = json.dumps(data)
        request = self.factory.post("/persistURL/", data=json_data, content_type='application/json')

        response = persist_url_view(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), url)
        res = db.news_collection.delete_one({'_id': url})
        self.assertEqual(res.deleted_count, 1)
        db.hashes_collection.delete_many({'urls': url})

    def test_post_request_with_invalid_url(self):
        url = 'https://www.dianamicloiu.com'
        # clear database
        db.nd_collection.delete_one({'_id': url})

        # create the request body
        data = {
            'key': url,
        }
        json_data = json.dumps(data)
        request = self.factory.post("/persistURL/", data=json_data, content_type='application/json')

        response = persist_url_view(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The url provided is invalid")

    def test_post_request_with_invalid_method(self):
        request = self.factory.get("/persistURL/")
        response = persist_url_view(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Expected POST, but got GET instead")


class TestTryView(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_get_request_with_valid_url(self):
        url = "www.google.com"
        request = self.factory.get(f"/try/{url}")
        response = try_view(request, url)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), "You entered " + url)

    def test_post_request_with_valid_url(self):
        url = "www.google.com"
        request = self.factory.put(f"/try/{url}")
        response = try_view(request, url)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Endpoint called with something different than GET")


class TestReqExView(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_post_request_with_valid_url(self):
        data = {
            'key': 'www.google.com',
        }
        json_data = json.dumps(data)
        request = self.factory.post("/reqex/", data=json_data, content_type='application/json')
        response = reqex_view(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), "Example response " + 'www.google.com')

    def test_get_request_with_valid_url(self):
        data = {
            'key': 'www.google.com',
        }
        json_data = json.dumps(data)
        request = self.factory.put("/reqex/", data=json_data, content_type='application/json')
        response = reqex_view(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Invalid request method")

    def test_post_request_with_invalid_data(self):
        data = {
            'key': 'www.google.com',
        }
        request = self.factory.post("/reqex/", data=data)
        response = reqex_view(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Invalid JSON data")


class TestDatabase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    # test database
    def test_check_database_indexing(self):
        url = 'www.matiboss157.com'

        # make sure the url is not already in the database -> clean up
        db.nd_collection.delete_one({'_id': url})

        # add it
        db.nd_collection.insert_one({'_id': 'www.matiboss157.com',
                                     'fingerprints': [{'shingle_hash': {'$numberInt': '3'}}]})

        self.assertTrue(sys.getsizeof(db.nd_collection.find({'fingerprints.shingle_hash': 3})) > 0)

        # final clean up
        db.nd_collection.delete_one({'_id': url})


class TestCompareURLs(TestCase):

    def setUp(self):
        self.factory = RequestFactory()

    def test_same_url(self):
        url = 'https://getbootstrap.com/docs/5.0/forms/layout/'

        # create the request body
        data = {
            'url_left': url,
            'url_right': url
        }

        json_data = json.dumps(data)
        request = self.factory.post("/compareURLs/", data=json_data, content_type='application/json')

        response = compare_URLs(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), '1.0')

    def test_different_urls_valid(self):
        url_left = 'https://getbootstrap.com/docs/5.0/forms/layout/'
        url_right = 'https://getbootstrap.com/docs/5.0/forms/validation/'

        # create the request body
        data = {
            'url_left': url_left,
            'url_right': url_right
        }

        json_data = json.dumps(data)
        request = self.factory.post("/compareURLs/", data=json_data, content_type='application/json')

        response = compare_URLs(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_left_invalid(self):
        url_left = 'https://dianamicloiu.com/'
        url_right = 'https://getbootstrap.com/docs/5.0/forms/validation/'

        # create the request body
        data = {
            'url_left': url_left,
            'url_right': url_right
        }

        json_data = json.dumps(data)
        request = self.factory.post("/compareURLs/", data=json_data, content_type='application/json')

        response = compare_URLs(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), 'The original url provided is invalid.')

    def test_right_invalid(self):
        url_left = 'https://getbootstrap.com/docs/5.0/forms/validation/'
        url_right = 'https://dianamicloiu.com/'

        # create the request body
        data = {
            'url_left': url_left,
            'url_right': url_right
        }

        json_data = json.dumps(data)
        request = self.factory.post("/compareURLs/", data=json_data, content_type='application/json')

        response = compare_URLs(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), 'The changed url provided is invalid.')

    def test_invalid_request(self):
        request = self.factory.get("/compareURLs/")
        response = compare_URLs(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Expected POST, but got GET instead")


class TestUrlSimilarity(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    # note that for this test the url provided is already in the db
    def test_valid_url(self):
        data = {
            'key': 'https://www.formula1.com/en/latest/article.breaking-honda-to-make-full-scale-f1-return-in-2026-as'
                   '-they-join-forces-with.WlzHSedIbSrZpXEXdC5QQ.html',
        }

        json_data = json.dumps(data)
        request = self.factory.post("/urlsimilarity/", data=json_data, content_type='application/json')
        response = url_similarity_checker(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_url_too_long(self):
        data = {
            'key': 'https://en.wikipedia.org/wiki/Kobe_Bryant',
        }
        json_data = json.dumps(data)
        request = self.factory.post("/urlsimilarity/", data=json_data, content_type='application/json')
        response = url_similarity_checker(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The article given has exceeded the maximum size supported.")

    def test_invalid_url_empty_text(self):
        data = {
            'key': 'https://www.vlad.com/',
        }
        json_data = json.dumps(data)
        request = self.factory.post("/urlsimilarity/", data=json_data, content_type='application/json')
        response = url_similarity_checker(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The article provided has no text.")

    def test_invalid_request(self):
        request = self.factory.get("/urlsimilairty/")
        response = url_similarity_checker(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Expected POST, but got GET instead")


class TestTextSimilarity(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    # note that for this test the url provided is already in the db
    def test_valid_text(self):
        data = {
            'key': 'Ana are mere',
        }

        json_data = json.dumps(data)
        request = self.factory.post("/checkText/", data=json_data, content_type='application/json')
        response = text_similarity_checker(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_text_too_long(self):
        # create a string text that exceeds the limit of the app
        s = ''
        for i in range(15000):
            s += 'a'

        data = {
            'key': s,
        }

        json_data = json.dumps(data)
        request = self.factory.post("/checkText/", data=json_data, content_type='application/json')
        response = text_similarity_checker(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The article given has exceeded the maximum size supported.")

    def test_invalid_text_empty(self):
        data = {
            'key': '',
        }
        json_data = json.dumps(data)
        request = self.factory.post("/checkText/", data=json_data, content_type='application/json')
        response = text_similarity_checker(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The article provided has no text.")

    def test_invalid_request(self):
        request = self.factory.get("/checkText/")
        response = text_similarity_checker(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Expected POST, but got GET instead")
