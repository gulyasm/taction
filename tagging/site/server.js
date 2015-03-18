var config  = require('./config')()
console.log(config);
var express = require('express');
var mg = require("mongoose");
var app = express();
var Tag = require("./models/tag");
mg.connect('mongodb://localhost/' + config.db_name);

app.use(express.bodyParser());
app.use(app.router);
// app.use(express.logger());
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))

require('./controllers')(app)

app.listen(config.port);
