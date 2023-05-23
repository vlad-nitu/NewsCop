from pymongo import MongoClient
uri = 'mongodb+srv://nituvladpetru:M5pKglfn03LSwK8b@cluster0.jijv5nj.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(uri)
db = client['news_db']
test_db = client['test_db']
