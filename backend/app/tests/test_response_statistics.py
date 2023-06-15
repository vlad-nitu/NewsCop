from django.test import TestCase

from app.response_statistics import ResponseStatistics, ResponseStatisticsEncoder
import json


# Create your tests here.
class ResponseStatisticsTest(TestCase):

    def test_response_statistics_attributes(self):
        users = 32
        performed_queries = 43
        stored_articles = 140
        similarities_retrieved = [1, 2, 3, 4, 5]
        entity = ResponseStatistics(users, performed_queries, stored_articles, similarities_retrieved)
        self.assertEqual(entity.users, users)
        self.assertEqual(entity.performed_queries, performed_queries)
        self.assertEqual(entity.stored_articles, stored_articles)
        self.assertEqual(entity.similarities_retrieved, similarities_retrieved)

    def test_response_statistics_encoder(self):
        users = 32
        performed_queries = 43
        stored_articles = 140
        similarities_retrieved = [1, 2, 3, 4, 5]
        entity = ResponseStatistics(users, performed_queries, stored_articles, similarities_retrieved)
        expected_json = '{"users": 32, "performed_queries": 43, "stored_articles": 140, ' \
                        '"similarities_retrieved": [1, 2, 3, 4, 5]}'

        json_data = json.dumps(entity, cls=ResponseStatisticsEncoder)
        self.assertEqual(json_data, expected_json)