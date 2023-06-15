from pymongo import MongoClient
uri = 'mongodb+srv://newscop:3piyXxBX4d2CZg4U@maincluster.qxr777j.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(uri)
db = client['news_db']
test_db = client['test_db']

# Retrieve the set of hashes
existing_fps = set(db.hashes_collection.find({}, {"_id": 1}).distinct('_id'))

# Number of users that opened the frontend application. This value is displayed on the statistics section.
users = 0

# Number of URL checks performed. This value is displayed on the statistics section.
url_check_queries = 0

# Number of articles that were retrieved in URL checks, for the ranges: 0-20%, 20-40%, 40-60%, 60-80%, 80-100%
similarities_retrieved = [0, 0, 0, 0, 0]

