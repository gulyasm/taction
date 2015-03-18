var fs = require("fs-extra");
var Comment = require("../models/comment");
var Feed = require("../models/feed");
var Album = require("../models/album");
var Photo = require("../models/photo");
var Tag = require("../models/tag");

var pages = JSON.parse(fs.readFileSync('./pages.json', 'utf-8'));

var politicians = new Object();
for (var i = 0; i < pages.length; i++) {
    var p = pages[i];
    politicians[p.key] = p;
}


function sum(list) {
    return list.reduce(function (a, b) {
        return a + b;
    }, 0);
}


function mean(tags) {
    return sum(tags) / tags.length;
}

function std (tags) {
    if(tags == undefined){
        return 0;
    }
    var avg = mean(tags);
    differences = tags.map(function(element){return Math.pow(element - avg, 2);});
    return Math.sqrt(sum(differences) / tags.length);

}


function load_deviations() {
    var deviations = {};
    deviations.indexes = [];
    Comment.find({}, function(err, comments) {
        if(err) {
            console.log(err);
            return;
        }
        for (var i = comments.length - 1; i >= 0; i--) {
            var comment = comments[i];
            var std = 0;
            if(comment.std != undefined) {
                std = comment.std;
            }
            deviations[comment._id] = std;
            deviations.indexes.push(comment._id);

        };

    })
    deviations.random = function() {
        var size = deviations.indexes.length;
        var index = Math.floor(Math.random() * size);
        console.log('size=' + this.size);
        var id = this.indexes[index];
        console.log('index=' + id);
        return id;
    }
    return deviations;
}

module.exports = function (app) {

    this.deviations = load_deviations();


    app.get('/', function (req, res) {
        Comment.findOne({'_id': this.deviations.random() }, null, function (err, comment) {
            console.log("Current comment: %s. Type: %s", comment._id, comment.type);
            if (comment.type.match("photo")) {
                Photo.findOne({_id: comment.photo }, null, function (err, photo) {
                    renderIndex(res, comment, photo.source, photo.name, undefined, photo._id, 'photo');
                });
            } else if (comment.type.match("feed")) {
                Feed.findOne({_id: comment.feed }, null, function (err, feed) {
                    console.log('Feedid: ' + feed._id);
                    var msg = feed.message;
                    if(feed.type.match("photo") || feed.type.match('video')) {
                        if(feed.message != undefined) {
                            msg = feed.message;
                        } else {
                            msg = feed.caption;
                        }

                    }
                    renderIndex(res, comment, feed.picture, undefined, msg, feed._id, 'feed');
                    return;
                });
            } else if (comment.type.match("album")) {
                Album.findOne({_id: comment.album }, null, function (err, album) {
                    Photo.findOne({_id: album.cover_photo }, null, function (err, photo) {
                        if(photo == undefined){
                            console.error("undefined photo for album");
                        }
                        renderIndex(res, comment, photo.source, album.name, undefined, album._id, 'album');
                        return;
                    });
                });
            } else {
                renderIndex(res, comment);
                return;
            }

        });

});

app.post('/ap', function(req, res) {
    var data = req.body;
    var tag = new Tag({
        from: {
            ip: req.connection.remoteAddress,
            fp: data.fp
        },
        sentiment: data.sentiment,
        content: data.contentId,
        type: data.type
    });
    tag.save();
});

app.post('/an', function(req, res) {
    var data = req.body;
    Comment.findOne({_id: data.commentId}, function (err, comment) {
        if(err){
            console.log('Error: ' + err);
            return;
        }
        comment.tags.push(data.sentiment);
        comment.std = std(comment.tags);
        comment.save();
    })
    var ip = req.headers['X-Real-IP'] || req.connection.remoteAddress;
    var tag = new Tag({
        from: {
            ip: ip,
            fp: data.fp
        },
        ts: new Date().getTime(),
        sentiment: data.sentiment,
        comment: data.commentId,
        type: 'comment'
    });
    tag.save();
});

function renderIndex(res, comment, photo, name, feed, contentId, type) {
    res.render('index', {
        comment: comment.message,
        commentId: comment._id,
        contentId: contentId,
        type: type,
        feed: feed,
        name: politicians[comment.politician].name,
        host: photo,
        title: name
    });
}
};
