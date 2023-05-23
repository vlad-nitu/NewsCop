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

        doc = {
            '_id': self.url,
            'published_date': self.published_date,
            'fingerprints': self.fingerprints
        }
        db.rares_news_collection.insert_one(doc)

        for fp in self.fingerprints:
            hash_exists = db.rares_hashes.find_one({'_id': fp}) is not None
            if hash_exists:
                bulk_operations.append(UpdateOne({"_id": fp}, {"$addToSet": {"urls": self.url}}))
            else:
                urls = [self.url]
                doc = {
                    '_id': fp,
                    'urls': urls
                }
                bulk_operations.append(InsertOne(doc))
        # Execute the bulk operations
        db.rares_hashes.bulk_write(bulk_operations)
