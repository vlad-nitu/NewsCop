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
