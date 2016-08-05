var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var router = require('express').Router();
module.exports = router;


router.get('/', function(req, res) {

  url = 'http://www.fullmatchesandshows.com/';

  var matches = [];
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      $('.entry-title').filter(function() {
        var data = $(this);
        var theGames = data.text()
        matches.push(theGames)
      })
      res.send(matches.slice(3, matches.length));
    }
  })

})
