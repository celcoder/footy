'use strict';

app.factory('FootyFactory', function($http) {

  var footy = {};

  var getData = function(res) {
    return res.data;
  }

  footy.getMatches = function() {
    return $http.get('/api/scraper')
      .then(getData);
    //   .then(function(matches){
    //   return matches.data
    // })
  }

  footy.getVideos = function(criteria) {
    return $http.get('/api/query/' + criteria)
      .then(getData);
    //   .then(function(matches){
    //   return matches.data
    // })
  }

  return footy;
})
