app.config(function($stateProvider){
	$stateProvider.state('home', {
		url:'/',
		templateUrl: 'index.html',
		controller: 'FootyCtrl',
		resolve: {
			reccentMatches: function(FootyFactory){
				var criteria =FootyFactory.getMatches()[1]
				return criteria
			},
			videos: function(FootyFactory, reccentMatches){
				return FootyFactory.getVideos(criteria)	
			}
		}
	});
});



app.controller('FootyCtrl', function($scope, $state, FootyFactory,videos) {
	$scope.videos

})