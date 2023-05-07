import json
from django.test import TestCase, RequestFactory
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status

from app.views import persist_url_view

class TestPersistUrlView(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_post_request_with_valid_url(self):
        url = "https://www.vlad.com"
        request = self.factory.post(f"/persistURL/{url}")
        response = persist_url_view(request, url)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_request_with_invalid_method(self):
        url = "https://www.example.com"
        request = self.factory.get(f"/persistURL/{url}")
        response = persist_url_view(request, url)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "Expected POST, but got GET instead")
