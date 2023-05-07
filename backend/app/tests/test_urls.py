from django.test import TestCase, tag
from django.urls import resolve, reverse

from app.views import persist_url_view

class UrlsTest(TestCase):
    @tag("unit")
    def test_persist_url_pattern(self):
        obtained_url = reverse('persist_url', kwargs={'url': 'www.vlad.com'})
        expected_url = '/persistURL/www.vlad.com/'

        obtained_view_function = resolve(obtained_url).func
        expected_view_function = persist_url_view

        self.assertEquals(obtained_url, expected_url)
        self.assertEquals(obtained_view_function, expected_view_function)
