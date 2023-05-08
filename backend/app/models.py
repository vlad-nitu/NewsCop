from utils import db
from mongoengine.fields import Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, ListField, StringField, DateTimeField, IntField

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
        fingerprints = [fp.to_mongo() for fp in self.fingerprints]
        db.nd_collection.insert_one({
            '_id': self.url,
            'published_date': self.published_date,
            'fingerprints': fingerprints 
        })
