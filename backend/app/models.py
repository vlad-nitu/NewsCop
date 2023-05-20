from utils import db
from mongoengine.fields import Document, EmbeddedDocument
from mongoengine.fields import ListField, StringField, DateTimeField, IntField

# Create your models here.
class React(Document):
    url = StringField()
    published_date = DateTimeField()

    def save(self, *args, **kwargs):
        db.copy_collection.insert_one({
            '_id': self.url,
            'published_date': self.published_date,
        })


class Fingerprint(EmbeddedDocument):
    shingle_hash = IntField()
    shingle_position = IntField()


class NewsDocument(Document):

    url = StringField()
    published_date = DateTimeField()
    fingerprints = ListField(IntField())

    def save(self, *args, **kwargs):
        db.rares_news_collection.insert_one({
            '_id': self.url,
            'published_date': self.published_date,
            'fingerprints': self.fingerprints
        })
        # fingerprints = [fp.() for fp in self.fingerprints]

        # db.rares_inverted_index.insert_one({})
