from pymongo import MongoClient
client = MongoClient()
import pandas as pd

tag_collection = client.sentiment.tags
tags = tag_collection.find()
df = pd.DateFrame(list(tags))

df['target'] = df.apply(lambda x: x['content'] if x[
                        'type'] == 'content' else x['comment'], axis=1)
