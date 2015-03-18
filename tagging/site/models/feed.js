var db = require('mongoose');

var schema = new db.Schema({
    _id: String,
    message: String,
    type: String,
    std: Number,
    tags: [Number],
    politician: String,
    caption: String,
    picture: String,
    created_time: String,
    from: {name: String, _id: Number},
    to: {name: String, _id: Number}

});
var Feed = db.model('Feed', schema);

module.exports = exports = Feed;
