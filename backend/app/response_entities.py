import json


class ResponseUrlEntity:
    def __init__(self, url, similarity):
        self.url = url
        self.similarity = similarity


class ResponseUrlEncoder(json.JSONEncoder):
    def default(self, obj):
        return {
            'url': obj.url,
            'similarity': obj.similarity
        }
