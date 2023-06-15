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
        self.similarities_retrieved = []
        for i in range(5):
            self.similarities_retrieved.append(similarities_retrieved[i])

    def increment_users(self):
        """
        Increments the number of users by 1.
        """
        self.users = self.users + 1

    def increment_performed_queries(self):
        """
        Increments the number of performed queries by 1.
        """
        self.performed_queries = self.performed_queries + 1

    def add_similarities_retrieved(self, similarities):
        """
        Adds the provided similarities to the existing similarities retrieved.
        :param similarities: A list of similarities to be added to the existing similarities retrieved.
                             The list should have a length of 5.
        """
        for i in range(5):
            self.similarities_retrieved[i] = self.similarities_retrieved[i] + similarities[i]

    def set_stored_articles(self, articles):
        """
        Sets the stored articles to the provided articles.
        :param articles: The number of articles stored in the database.
        """
        self.stored_articles = articles

    def set_values(self, statistics):
        """
        Sets all the fields to the values stored in statistics.
        :param articles: The new values for the fields
        """
        self.users = statistics.users
        self.performed_queries = statistics.performed_queries
        self.stored_articles = statistics.stored_articles
        self.similarities_retrieved = []
        for i in range(5):
            self.similarities_retrieved.append(statistics.similarities_retrieved[i])

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
