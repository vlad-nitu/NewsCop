import json
import time
from unittest.mock import patch
from unittest.mock import MagicMock

from django.test import TestCase, RequestFactory
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status

from app.response_entities import ResponseTwoUrlsEncoder
from app.views import compare_texts_view
from app.views import persist_url_view
from app.views import try_view
from app.views import reqex_view
from app.views import url_similarity_checker
from app.views import compare_URLs
from app.views import text_similarity_checker
from app.views import update_users
from app.views import retrieve_statistics
from app.response_statistics import ResponseStatistics, ResponseStatisticsEncoder
from utils import db
from utils import statistics
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

    # note that this test also tests the correct persist chaining
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
        self.assertEqual(json.loads(response.content.decode())['similarity'], 1.0)

    def test_different_urls_valid(self):
        # Date is None for both urls
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

    def test_different_urls_valid_date(self):
        # Date is 2020-05-20 15:38:02
        url_left = 'https://ratherexposethem.org/2020/05/20/pelosis-heroes-' \
                   'act-forces-unemployed-americans-to-compete-with-illegal-aliens/'
        # Date is 2020-05-20 16:59:30
        url_right = 'https://dcdirtylaundry.com/pelosis-heroes-act-forces-un' \
                    'employed-americans-to-compete-with-illegal-aliens/'
        # Create the request body
        data = {
            'url_left': url_left,
            'url_right': url_right
        }
        json_data = json.dumps(data)
        request = self.factory.post("/compareURLs/", data=json_data, content_type='application/json')
        response = compare_URLs(request)
        parsed_response = json.loads(response.content.decode())

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(0.88, round(parsed_response["similarity"], 2))
        self.assertEqual(1, parsed_response["ownership"])
        self.assertEqual('2020-05-20 15:38:02', parsed_response["left_date"])
        self.assertEqual('2020-05-20 16:59:30', parsed_response["right_date"])

    def test_different_urls_valid_date_swapped(self):
        # Date is 2020-05-20 15:38:02
        url_right = 'https://ratherexposethem.org/2020/05/20/pelosis-heroes-' \
                    'act-forces-unemployed-americans-to-compete-with-illegal-aliens/'
        # Date is 2020-05-20 16:59:30
        url_left = 'https://dcdirtylaundry.com/pelosis-heroes-act-forces-un' \
                   'employed-americans-to-compete-with-illegal-aliens/'
        # Create the request body
        data = {
            'url_left': url_left,
            'url_right': url_right
        }
        json_data = json.dumps(data)
        request = self.factory.post("/compareURLs/", data=json_data, content_type='application/json')
        response = compare_URLs(request)
        parsed_response = json.loads(response.content.decode())

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(0.88, round(parsed_response["similarity"], 2))
        self.assertEqual(2, parsed_response["ownership"])
        self.assertEqual('2020-05-20 15:38:02', parsed_response["right_date"])
        self.assertEqual('2020-05-20 16:59:30', parsed_response["left_date"])

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
        self.copy_statistics = ResponseStatistics(statistics.users, statistics.performed_queries,
                                                  statistics.stored_articles, statistics.similarities_retrieved)

    def tearDown(self):
        statistics.set_values(self.copy_statistics)

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

class TestStatisticsUpdates(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.copy_statistics = ResponseStatistics(statistics.users, statistics.performed_queries,
                                                  statistics.stored_articles, statistics.similarities_retrieved)

    def tearDown(self):
        statistics.set_values(self.copy_statistics)

    def test_update_users(self):
        statistics.similarities_retrieved[0] = statistics.similarities_retrieved[0] + 1
        request = self.factory.post("/updateUsers/")
        response = update_users(request)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(self.copy_statistics.users + 1, statistics.users)

    def test_update_users_invalid(self):
        request = self.factory.get("/updateUsers/")
        response = update_users(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Expected POST, but got GET instead")

    def test_retrieve_statistics(self):
        request = self.factory.get("/retrieveStatistics/")
        response = retrieve_statistics(request)
        parsed_response = json.loads(response.content.decode())

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(statistics.users, parsed_response["users"])
        self.assertEqual(statistics.performed_queries, parsed_response["performed_queries"])
        self.assertEqual(db.news_collection.count_documents({}), parsed_response["stored_articles"])
        self.assertEqual(statistics.similarities_retrieved, parsed_response["similarities_retrieved"])

    def test_retrieve_statistics_invalid(self):
        request = self.factory.post("/retrieveStatistics/")
        response = retrieve_statistics(request)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Expected GET, but got POST instead")

    def test_statistics_update(self):
        data = {
            'key': 'https://www.formula1.com/en/latest/article.breaking-honda-to-make-full-scale-f1-return-in-2026-as'
                   '-they-join-forces-with.WlzHSedIbSrZpXEXdC5QQ.html',
        }

        json_data = json.dumps(data)
        request = self.factory.post("/urlsimilarity/", data=json_data, content_type='application/json')
        url_similarity_checker(request)

        request = self.factory.get("/retrieveStatistics/")
        response = retrieve_statistics(request)
        parsed_response = json.loads(response.content.decode())
        self.assertEqual(self.copy_statistics.users, parsed_response["users"])
        self.assertEqual(self.copy_statistics.performed_queries + 1, parsed_response["performed_queries"])
        self.assertEqual(db.news_collection.count_documents({}), parsed_response["stored_articles"])
        self.assertNotEqual(self.copy_statistics.similarities_retrieved, parsed_response["similarities_retrieved"])
