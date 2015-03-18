__author__ = 'gulyasm'
from pymongo import MongoClient
import matplotlib.pyplot as plt


client = MongoClient('localhost', 27017)
db = client.sentiment
col = db['likecounts']

result = col.find({})
ps = {}
for r in result:
    if r["subject"]["id"] not in ps:
        ps[r["subject"]["id"]] = []
    ps[r["subject"]["id"]].append(r["like_count"])

for l in ps:
    plt.plot(ps[l], label=l)

plt.legend(bbox_to_anchor=(1.05, 1), loc=2, borderaxespad=0.)

#plt.axis([0, 20, 41000, 45000])
plt.grid(True)
plt.show()