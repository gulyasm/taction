var db = require('mongoose');

var schema = new db.Schema({
    from: {
        fp: Number,
        ip: String
    },
    sentiment: Number,
    ts: Number,
    comment: String,
    content: String,
    created_time: Number,
    type: String
});
var Tag = db.model('Tag', schema);

module.exports = exports = Tag;
