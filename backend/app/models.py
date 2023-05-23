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

    def save(self):
        # Implemented in a batch processing fashion
        visited_fps = set()  # the fingerprints that the current document has
        doc = {
            '_id': self.url,
            'published_date': self.published_date,
            'fingerprints': self.fingerprints
        }
        db.rares_news_collection.insert_one(doc)

        for fp in self.fingerprints:
            if fp not in visited_fps:
                visited_fps.add(fp)
        existing_fps = set(
            [x['_id'] for x in db.rares_hashes.find({}, {"_id": 1})])  # the already existing fps in the collection
        need_to_update_fps = visited_fps & existing_fps  # the already existing fp_s
        need_to_insert_fps = visited_fps - need_to_update_fps  # the fp_s that need to be inserted
        # Update matching documents in rares_hashes collection

        filter_condition = {"_id": {"$in": list(need_to_update_fps)}}
        update_query = {"$addToSet": {"urls": self.url}}
        db.rares_hashes.update_many(filter_condition, update_query)
        to_insert = []
        for i in need_to_insert_fps:
            to_insert.append({"_id": i, "urls": [self.url]})
        if len(to_insert) != 0:
            db.rares_hashes.insert_many(to_insert)
