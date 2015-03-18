var db = require('mongoose');

var schema = new db.Schema({
    _id: String,
    created_time: String,
    comment_count: Number,
    message: String,
    politician: String,
    random: Number,
    photo: String,
    album: String,
    feed: String,
    type: String,
    parent: {
        id: String,
        from:{
            id: Number,
            name: String
        }
    },
    from: {name: String, _id: Number},
    like_count: Number,
    tags: [Number],
    std: Number

}, { collection: 'learningset' });

var Comment = db.model('Comment', schema);

module.exports = exports = Comment;
