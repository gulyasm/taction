var db = require('mongoose');

var schema = new db.Schema({
    _id: String,
    name: String,
    link: String,
    count: Number,
    std: Number,
    tags: [Number],
    politician: String,
    cover_photo: String,
    description: String,
    type: String,
    created_time: String,
    from: {name: String, _id: Number}

});
var Album = db.model('Album', schema);

module.exports = exports = Album;
