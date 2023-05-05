from pymongo import MongoClient
uri = 'mongodb+srv://newscop:3piyXxBX4d2CZg4U@maincluster.qxr777j.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(uri)
db = client['news_db']
