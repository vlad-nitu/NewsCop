from django.test import TestCase

from app.response_entities import ResponseUrlEntity, ResponseUrlEncoder, ResponseTwoUrlsEntity, ResponseTwoUrlsEncoder
import json


# Create your tests here.
class ResponseEntitiesTest(TestCase):

    def test_response_url_entity_attributes(self):
        url = "https://example.com"
        similarity = 0.85
        title = "Title"
        publisher = "Publisher"
        date = "2017-07-17"
        entity = ResponseUrlEntity(url, similarity, title, publisher, date)
        self.assertEqual(entity.url, url)
        self.assertEqual(entity.similarity, similarity)
        self.assertEqual(entity.title, title)
        self.assertEqual(entity.publisher, publisher)
        self.assertEqual(entity.date, date)

    def test_response_url_encoder(self):
        url = "https://example.com"
        similarity = 0.85
        title = "Title"
        publisher = "Publisher"
        date = "2017-07-17"
        entity = ResponseUrlEntity(url, similarity, title, publisher, date)
        expected_json = '{"url": "https://example.com", "similarity": 0.85, "title": "Title", ' \
                        '"publisher": "Publisher", "date": "2017-07-17"}'

        json_data = json.dumps(entity, cls=ResponseUrlEncoder)
        self.assertEqual(json_data, expected_json)

    def test_response_two_urls(self):
        similarity = 0.6
        ownership = 0
        left_date = '2020-05-20 16:59:30'
        right_date = '2020-05-20 16:59:31'
        entity = ResponseTwoUrlsEntity(similarity, ownership, left_date, right_date)
        self.assertEqual(entity.similarity, similarity)
        self.assertEqual(entity.ownership, ownership)
        self.assertEqual(entity.left_date, left_date)
        self.assertEqual(entity.right_date, right_date)

    def test_response_two_urls_encoder(self):
        similarity = 0.6
        ownership = 0
        left_date = '2020-05-20 16:59:30'
        right_date = '2020-05-20 16:59:31'
        entity = ResponseTwoUrlsEntity(similarity, ownership, left_date, right_date)
        expected_json = '{"similarity": 0.6, "ownership": 0, ' \
                        '"left_date": "2020-05-20 16:59:30", "right_date": "2020-05-20 16:59:31"}'
        json_data = json.dumps(entity, cls=ResponseTwoUrlsEncoder)
        self.assertEqual(json_data, expected_json)
