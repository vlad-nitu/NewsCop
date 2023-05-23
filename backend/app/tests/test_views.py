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
from app.views import compare_URLs

from utils import db
import sys

# class TestUrlSimilarityChecker(TestCase):
#     def setUp(self):
#         self.request = MagicMock()
#         self.request.method = 'POST'
#         self.request.body = json.dumps({
#             "key": 'http://example.com'
#         })

#     @patch('utils.db')
#     @patch('app.views.persist_url_view')
#     @patch('app.plagiarism_checker.similarity.compute_similarity')
#     def test_high_similarity(self, mock_compute_similarity, mock_persist_url_view, mock_db):
#         # Prepare mock data for persist_url_view
#         mock_persist_url_view.return_value.content = b'http://example.com'

#         # Prepare mock data for the database
#         mock_db.nd_collection.find_one.return_value = {
#             '_id': 'http://example.com',
#             'fingerprints': [
#                 {'shingle_hash': 'hash1'},
#                 {'shingle_hash': 'hash2'},
#             ]
#         }
#         mock_db.nd_collection.find.return_value = [
#             {
#                 '_id': 'article1',
#                 'fingerprints': [
#                     {'shingle_hash': 'hash1'},
#                     {'shingle_hash': 'hash2'},
#                 ]
#             },
#             {
#                 '_id': 'article2',
#                 'fingerprints': [
#                     {'shingle_hash': 'hash3'},
#                     {'shingle_hash': 'hash4'},
#                 ]
#             }
#         ]
#         mock_compute_similarity.return_value = 0.8

#         # Call the method under test
#         response = url_similarity_checker(self.request)

#         # Assertions
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.content, b'(True, \'article1\')')


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
        db.rares_news_collection.delete_one({'_id': url})

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
        res = db.rares_news_collection.delete_one({'_id': url})
        self.assertEqual(res.deleted_count, 1)

    def test_post_request_with_valid_url_text(self):
        url = 'https://www.bbc.com/news/world-asia-65657996'

        # clear database
        db.rares_news_collection.delete_one({'_id': url})

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
        res = db.rares_news_collection.delete_one({'_id': url})
        self.assertEqual(res.deleted_count, 1)

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
        db.nd_collection.insert_one({'_id': 'www.matiboss157.com', 'published_date': '2023-05-09 01:00:00',
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
