from django.test import TestCase, RequestFactory
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status

from app.handlers import SanitizationHandler
from app.handlers import ContentHandler
from app.handlers import DatabaseHandler

from utils import schema, conn, existing_fps


class TestSanitizationHandler(TestCase):
    def setUp(self):
        self.sanitise = SanitizationHandler()
        # Set up database connection
        self.cursor = conn.cursor()
        existing_fps.clear()
        # Delete existing data from tables
        self.cursor.execute(f'DELETE FROM {schema}.url_fingerprints')
        self.cursor.execute(f'DELETE FROM {schema}.urls')
        self.cursor.execute(f'DELETE FROM {schema}.fingerprints')
        conn.commit()

    def tearDown(self):
        existing_fps.clear()
        # Roll back the transaction after each test
        self.cursor.execute(f'DELETE FROM {schema}.url_fingerprints')
        self.cursor.execute(f'DELETE FROM {schema}.urls')
        self.cursor.execute(f'DELETE FROM {schema}.fingerprints')
        conn.commit()

    # note that the handler is not
    def test_url_valid(self):
        url = "https://www.bbc.com/news/entertainment-arts-65488861"
        response = self.sanitise.handle(url)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), url)

    def test_url_invalid(self):
        url = "www.%23jnxjskdc.c^"
        response = self.sanitise.handle(url)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The url provided is invalid")

    def test_url_valid_but_nonexistent(self):
        url = "https://www.dianamicloiu.com"
        response = self.sanitise.handle(url)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The url provided is invalid")

    def test_chaining(self):
        content_check = ContentHandler()
        self.sanitise.set_next(content_check)

        self.assertEqual(content_check, self.sanitise._next_handler)


class TestDatabaseHandler(TestCase):
    def setUp(self):
        self.database_check = DatabaseHandler()
        # Set up database connection
        self.cursor = conn.cursor()
        existing_fps.clear()
        # Delete existing data from tables
        self.cursor.execute(f'DELETE FROM {schema}.url_fingerprints')
        self.cursor.execute(f'DELETE FROM {schema}.urls')
        self.cursor.execute(f'DELETE FROM {schema}.fingerprints')

    def tearDown(self):
        # Roll back the transaction after each test
        self.cursor.execute(f'DELETE FROM {schema}.url_fingerprints')
        self.cursor.execute(f'DELETE FROM {schema}.urls')
        self.cursor.execute(f'DELETE FROM {schema}.fingerprints')

    # note that the handler is not
    def test_url_existent(self):
        url = "https://www.bbc.com/news/world-europe-65593504"
        response = self.database_check.handle(url)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), url)

    # note that this teste will return a 200 response as the handler is not chained
    def test_url_nonexistent(self):
        url = "https://www.dianamicloiu.com"
        response = self.database_check.handle(url)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), url)

    def test_chaining(self):
        content_check = ContentHandler()
        self.database_check.set_next(content_check)

        self.assertEqual(content_check, self.database_check._next_handler)


class TestContentHandler(TestCase):

    def setUp(self):
        self.content_check = ContentHandler()
        # Set up database connection
        self.cursor = conn.cursor()
        existing_fps.clear()
        # Delete existing data from tables
        self.cursor.execute(f'DELETE FROM {schema}.url_fingerprints')
        self.cursor.execute(f'DELETE FROM {schema}.urls')
        self.cursor.execute(f'DELETE FROM {schema}.fingerprints')

    def tearDown(self):
        # Roll back the transaction after each test
        self.cursor.execute(f'DELETE FROM {schema}.url_fingerprints')
        self.cursor.execute(f'DELETE FROM {schema}.urls')
        self.cursor.execute(f'DELETE FROM {schema}.fingerprints')

    # note that the handler is not
    def test_url_no_text(self):
        url = "https://www.vlad.com/"
        response = self.content_check.handle(url)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The article provided has no text.")

    def test_url_too_much_text(self):
        url = "https://en.wikipedia.org/wiki/Kobe_Bryant"
        response = self.content_check.handle(url)

        self.assertIsInstance(response, HttpResponseBadRequest)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.content.decode(), "The article given has exceeded the maximum size supported.")

    def test_url_content_valid(self):
        url = 'https://www.bbc.com/news/world-asia-65657996'

        response = self.content_check.handle(url)

        self.assertIsInstance(response, HttpResponse)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.content.decode(), url)

    def test_chaining(self):
        sanitise = SanitizationHandler()
        self.content_check.set_next(sanitise)

        self.assertEqual(sanitise, self.content_check._next_handler)
