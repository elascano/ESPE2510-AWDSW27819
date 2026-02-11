from pymongo import MongoClient

MONGO_URI = "mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/?appName=Cluster0"
client = MongoClient(MONGO_URI)

db = client["oop"]
customers = db["Customers"]
