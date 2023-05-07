from django.test import TestCase, tag
from django.urls import path, reverse
from app.urls import urlpatterns
from app.views import persist_url_view

class UrlsTest(TestCase):
    @tag("unit")
    def test_persist_url_pattern(self):
        obtained_url = reverse('persist_url', kwargs={'url': 'www.vlad.com'})
        expected_url = '/persistURL/www.vlad.com/'
        self.assertEquals(obtained_url, expected_url)
