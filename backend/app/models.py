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
        for i in self.fingerprints:
            hash_exists = db.rares_hashes.find_one({'_id': i}) is not None
            if hash_exists:
                db.rares_hashes.update_one({"_id": i}, {"$addToSet": {"hashes": self.url}})
            else:
                hash_set = [self.url]
                db.rares_hashes.insert_one({
                    '_id': i,
                    'hashes': hash_set
                })
