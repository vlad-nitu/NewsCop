import json


class ResponseStatistics:
    def __init__(self, users, performed_queries, stored_articles, similarities_retrieved):
        """
        Constructor for the response of the statistics endpoint.
        :param users: the number of users that used the application
        :param performed_queries: the number of of URL checks performed
        :param stored_articles: the number of articles stored in the database
        :param similarities_retrieved: the number of articles that were retrieved in URL checks,
        for the ranges: 0-20%, 20-40%, 40-60%, 60-80%, 80-100%
        """
        self.users = users
        self.performed_queries = performed_queries
        self.stored_articles = stored_articles
        self.similarities_retrieved = similarities_retrieved


class ResponseStatisticsEncoder(json.JSONEncoder):
    def default(self, obj):
        """
        The encoder for the statistics entity.
        :param obj: the entity
        :return: a JSON object
        """
        return {
            'users': obj.users,
            'performed_queries': obj.performed_queries,
            'stored_articles': obj.stored_articles,
            'similarities_retrieved': obj.similarities_retrieved,
        }
