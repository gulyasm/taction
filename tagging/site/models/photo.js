var db = require('mongoose');

var schema = new db.Schema({
    _id: String,
    name: String,
    link: String,
    politician: String,
    created_time: String,
    source: String,
    parsed: Boolean,
    from: {name: String, _id: Number}

});
var Photo = db.model('Photo', schema);

module.exports = exports = Photo;
