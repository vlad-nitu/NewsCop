from pymongo import InsertOne, UpdateOne
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

    def save(self): # Implemented in a batch processing fashion
        # Batch operations for inserting fingerprints and updating hashes
        bulk_operations = []
        visited_fps = set()
        mp = {}

        doc = {
            '_id': self.url,
            'published_date': self.published_date,
            'fingerprints': self.fingerprints
        }
        db.rares_news_collection.insert_one(doc)

        for fp in self.fingerprints:
           if fp not in visited_fps:
                visited_fps.add(fp)

        # Update matching documents in rares_hashes collection
        filter_condition = {"_id": {"$in": list(visited_fps)}}
        update_query = {"$addToSet": {"urls": self.url}}
        db.rares_hashes.update_many(filter_condition, update_query)
