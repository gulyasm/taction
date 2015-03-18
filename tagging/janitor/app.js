var MongoClient = require("mongodb").MongoClient;

MongoClient.connect('mongodb://localhost:27017/sentiment', function(err, db) {

    if(err) {
        console.log(err);
        return;
    }
    console.log('connected!');
    content_tags = {};
    db.collection('tags').find({'comment': {'$exists': false}}).toArray(function(err, docs) {
        var count = 0;
        for (var i = docs.length - 1; i >= 0; i--) {
            var tag = docs[i]
            if(content_tags[tag._id]) {
                content_tags[tag._id].tag.push(tag.sentiment);
            }else {
                content_tags[tag._id] = {type: tag.type, tag: [tag.sentiment]};
                count++;
            }

        };

        var tag_collection = db.collection('content_tags')

        for (var key in content_tags){
            var tag = content_tags[key];
            tag_collection.save({_id: key, tags: tag.tag}, function(err, element) {
                if(err){
                    console.log(err);
                }
                if(--count == 0) {
                    db.close();
                }
            })

        }


    });
});
