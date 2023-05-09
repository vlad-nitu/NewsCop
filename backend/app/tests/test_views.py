import json
from unittest.mock import patch

from django.test import TestCase, RequestFactory
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status

from app.views import persist_url_view
from app.views import try_view
from app.views import reqex_view

from utils import db


class TestPersistUrlView(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    # @patch('app.plagiarism_checker.fingerprinting.compute_fingerprint', return_value=[(10, 1), (35, 7)])
    # def test_post_request_with_valid_url(self):
    #     url = "https://www.vlad.com"
    #     db.nd_collection.delete_one({'_id': url})
    #
    #     request = self.factory.post(f"/persistURL/{url}")
    #     response = persist_url_view(request, url)
    #
    #     self.assertIsInstance(response, HttpResponse)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.content.decode(), url)
    #
    #     res = db.nd_collection.delete_one({'_id': url})
    #     self.assertEqual(res.deleted_count, 1)
    #
    # @patch('app.plagiarism_checker.fingerprinting.compute_fingerprint', return_value=[(10, 1), (35, 7)])
    # def test_post_request_with_invalid_method(self):
    #     url = "https://www.example.com"
    #     request = self.factory.get(f"/persistURL/{url}")
    #     response = persist_url_view(request, url)
    #
    #     self.assertIsInstance(response, HttpResponseBadRequest)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response.content.decode(), "Expected POST, but got GET instead")


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
