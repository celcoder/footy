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
      },
      matches: function (FootyFactory) {
        return FootyFactory.getScores();
      }
    }
  })
})

app.controller('FootyCtrl', function($scope, $state, reccentMatches, $sce, matches) {

  for(var i = 0; i<matches.length; i++){
        console.log(matches[i].awayTeam.name)
      }


  $scope.matches = matches;

  
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


[
  {
    "competition": {
      "ordering": 7200,
      "dbid": 135,
      "name": "Liga MX",
      "flagUrl": "https://static.crowdscores.com/flags/mexico.png"
    },
    "nextState": 1,
    "currentStateStart": null,
    "dbid": 71811,
    "aggregateScore": null,
    "awayGoals": 0,
    "start": 1470448800000,
    "homeGoals": 0,
    "extraTimeHasHappened": false,
    "linesOfText": [],
    "season": {
      "dbid": 11,
      "end": 1483225200000,
      "name": "2016",
      "start": 1451610000000
    },
    "homeTeam": {
      "shirtUrl": "https://static.crowdscores.com/kits/default.svg",
      "name": "Veracruz",
      "dbid": 1752,
      "flagUrl": "https://static.crowdscores.com/flags/default.png",
      "isNational": false,
      "badgeUrl": "https://static.crowdscores.com/badges/default.svg",
      "shortName": "Veracruz",
      "shortCode": "VER"
    },
    "dismissals": {
      "home": 0,
      "away": 0
    },
    "penaltyShootout": {},
    "isResult": false,
    "goToExtraTime": false,
    "venue": null,
    "limitedCoverage": false,
    "awayTeam": {
      "shirtUrl": "https://static.crowdscores.com/kits/default.svg",
      "name": "Club América",
      "dbid": 1754,
      "flagUrl": "https://static.crowdscores.com/flags/default.png",
      "isNational": false,
      "badgeUrl": "https://static.crowdscores.com/badges/default.svg",
      "shortName": "América",
      "shortCode": "AME"
    },
    "outcome": null,
    "round": {
      "dbid": 1058,
      "hasLeagueTable": true,
      "name": "Apertura"
    },
    "currentState": 0
  }]
