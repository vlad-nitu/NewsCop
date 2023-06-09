import json


class ResponseUrlEntity:
    def __init__(self, url, similarity, title, publisher, date):
        self.url = url
        self.similarity = similarity
        self.title = title
        self.publisher = publisher
        self.date = date


class ResponseUrlEncoder(json.JSONEncoder):
    def default(self, obj):
        return {
            'url': obj.url,
            'similarity': obj.similarity,
            'title': obj.title,
            'publisher': obj.publisher,
            'date': obj.date
        }


class ResponseTwoUrlsEntity:
    def __init__(self, similarity, ownership, left_date, right_date):
        """
        Constructor for the response of the two urls endpoint.
        :param similarity: the similarity between the two urls
        :param ownership: the ownership relation between the news articles
        :param left_date: the date in the left input
        :param right_date: the date in the right input
        """
        self.similarity = similarity
        self.ownership = ownership
        self.left_date = left_date
        self.right_date = right_date


class ResponseTwoUrlsEncoder(json.JSONEncoder):
    def default(self, obj):
        """
        The encoder for the two urls entity.
        :param obj: the entity
        :return: a JSON object
        """
        return {
            'similarity': obj.similarity,
            'ownership': obj.ownership,
            'left_date': obj.left_date,
            'right_date': obj.right_date
        }
