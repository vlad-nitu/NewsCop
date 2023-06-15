from pymongo import MongoClient
from app.response_statistics import ResponseStatistics
uri = 'mongodb+srv://newscop:3piyXxBX4d2CZg4U@maincluster.qxr777j.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(uri)
db = client['news_db']
test_db = client['test_db']

# Retrieve the set of hashes
existing_fps = set(db.hashes_collection.find({}, {"_id": 1}).distinct('_id'))

# The statistics that will be displayed on the frontend
statistics = ResponseStatistics(0, 0, 0, [0, 0, 0, 0, 0])


