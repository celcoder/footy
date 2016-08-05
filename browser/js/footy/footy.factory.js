'use strict';

app.factory('FootyFactory', function ($http) {

var footy = {};

	footy.getMatches = function (){
		return $http.get('/api/scraper')
		.then(function(matches){
			return matches.data
		})
		// .then(matches => return matches.data)
	}

	footy.getVideos = function (criteria){
		return $http.get('/api/query/' + criteria)
		.then(function(videos){
			return videos.data
		})

		// .then(videos => return videos.data)
	}

return footy;
}