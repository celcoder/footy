app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: './js/footy/home.html'
    // controller: 'FootyCtrl',
    // resolve: {
    //   reccentMatches: function(FootyFactory) {
    //     return FootyFactory.getMatches();
    //   },
    //   videos: function(FootyFactory) {
    //     return FootyFactory.getVideos();
    //   }
    // }
  })
})

// app.controller('FootyCtrl', function($scope, $state, videos, reccentMatches) {
  // $scope.videos = videos(criteria);
// })
