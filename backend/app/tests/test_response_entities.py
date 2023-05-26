from django.test import TestCase

from app.response_entities import ResponseUrlEntity, ResponseUrlEncoder
import json


# Create your tests here.
class ResponseEntitiesTest(TestCase):

    def test_response_url_entity_attributes(self):
        url = "https://example.com"
        similarity = 0.85
        entity = ResponseUrlEntity(url, similarity)
        self.assertEqual(entity.url, url)
        self.assertEqual(entity.similarity, similarity)

    def test_response_url_encoder(self):
        url = "https://example.com"
        similarity = 0.85
        entity = ResponseUrlEntity(url, similarity)
        expected_json = '{"url": "https://example.com", "similarity": 0.85}'

        json_data = json.dumps(entity, cls=ResponseUrlEncoder)
        self.assertEqual(json_data, expected_json)
