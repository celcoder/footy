app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './js/footy/home.html',
    controller: 'FootyCtrl',
    resolve: {
      reccentMatches: function(FootyFactory, $q) {
        return FootyFactory.getMatches()
          .then(function(matches) {
            var promises = [];
            for (var i = 0; i < matches.length; i++) {
              promises.push(FootyFactory.getVideos(matches[i]));
            }
            return $q.all(promises);
          });
      }
    }
  })
})

app.controller('FootyCtrl', function($scope, $state, reccentMatches, $sce) {
  
  
  var vidStr = reccentMatches.toString().split(",");
  var vid = vidStr.filter(function(n) {
    return n != "";
  })
  vid = vid.splice(0, 9);
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }



  $scope.video = {src: vid}

})
