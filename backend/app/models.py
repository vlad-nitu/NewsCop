from utils import db
from mongoengine import Document, fields

# Create your models here.
class React(Document):
    url = fields.StringField()
    # TODO CHECK WHENEVER USERS ENTER URL THAT IT IS VALID URL, AND THAT THERE IS AN ACTUAL WEBSITE THERE

    published_date = fields.DateTimeField()

    def save(self, *args, **kwargs):
        db.copy_collection.insert_one({
            '_id': self.url,
            'published_date':self.published_date,
        })
