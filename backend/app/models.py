from utils import db
from mongoengine import Document
from mongoengine.fields import EmbeddedDocument, EmbeddedDocumentField, ListField, StringField, DateTimeField, IntField


# Create your models here.
class React(Document):
    url = StringField()
    # TODO CHECK WHENEVER USERS ENTER URL THAT IT IS VALID URL, AND THAT THERE IS AN ACTUAL WEBSITE THERE

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
    fingerprints = ListField(EmbeddedDocumentField(Fingerprint))

    def save(self, *args, **kwargs):
        db.news_entity_collection.insert_one({
            '_id': self.url,
            'published_date': self.published_date,
            'fingerprints': self.fingerprints
        })
