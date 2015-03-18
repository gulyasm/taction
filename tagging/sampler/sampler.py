__author__ = 'gulyasm'
from pymongo import MongoClient
import random
import time
SAMPLING_SIZE = 1000

start = time.time()
client = MongoClient('localhost', 27017)
db = client.sentiment
comments_collection = db['comments']
learning_set_collection = db['learningset']

print("Sampling size: {0}".format(SAMPLING_SIZE))
print("Sampling...")

learning_set_collection.remove()
count = learning_set_collection.count()
while count < SAMPLING_SIZE:
    i = SAMPLING_SIZE - count
    while i > 0:
        rand = random.random()
        result = comments_collection.find_one(
            {"random": {"$gte": rand}, "parent": {"$exists": False}})
        if result is None:
            result = comments_collection.find_one(
                {"random": {"$lte": rand}, "parent": {"$exists": False}})
            if result is None:
                raise RuntimeError("No element to save")
        learning_set_collection.save(result)
        i -= 1
    count = learning_set_collection.count()

print 'Finished in', time.time() - start, 's'
