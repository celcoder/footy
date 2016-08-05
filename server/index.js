var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//this is to grab routes files.
var query = require('./routes/query');
var scraper = require('./routes/scraper')
// remember to plug in your router and any other middleware you may need here.

module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var npmPath = path.join(__dirname, '../node_modules');
var publicPath = path.join(__dirname, '../public');
var browserPath = path.join(__dirname, '../browser');

app.use(express.static(npmPath));
app.use(express.static(publicPath));
app.use(express.static(browserPath));

app.use('/api/query', query);
app.use('/api/scraper', scraper);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});



