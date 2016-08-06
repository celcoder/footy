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
      matches: function(FootyFactory) {
        return FootyFactory.getScores();
      }
    }
  })
})

app.controller('FootyCtrl', function($scope, $state, reccentMatches, $sce, matches, FootyFactory) {


  var vidStr = reccentMatches.toString().split(",");
  var vid = vidStr.filter(function(n) {
    return n != "";
  })
  vid = vid.splice(0, 9);
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }



  $scope.video = { src: vid }

  // <---------------------------modal box------------------------------------->
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
    var audio = document.getElementById("audio");
    audio.play();
    setTimeout(function() {
      modal.style.display = "none"
    }, 5000)
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  //<-----------parse match data functions-------------->
  var firstData = matches;
  var secondData;

  // function getMatches() {
  //   setTimeout(function() {
  //     secondData = FootyFactory.getScores()
  //     .then(res => convert(res))
  //     .then(converted => diff(firstData, converted))
  //     .then(final => final)
  //   }, 2000)
  // }

  
    setTimeout(function() {

      secondData = FootyFactory.getScores()
        .then(function(res) {
          console.log("here")
          return convert(res)
        })
        .then(function(converted) {
          console.log("here1")
          return diff(firstData, converted)
        })
        .then(function(final) {
          console.log(final);
          return final
        })
    }, 60000)



  function convert(matches) {
    arr = []
    for (var i = 0; i < matches.length; i++) {
      matchArr = []
      var awayT = String(matches[i].awayTeam.name)
      var awayG = String(matches[i].awayGoals)
      var homeT = String(matches[i].homeTeam.name)
      var homeG = String(matches[i].homeGoals)
      matchArr.push(homeT)
      matchArr.push(homeG)
      matchArr.push(awayT)
      matchArr.push(awayG)
      arr.push(matchArr)
    }
    return arr
  }


  function diff(firstinterval, secondinterval) {
    updated = []
    for (var i = 0; i < firstinterval.length; i++) {
      for (var j = 0; j < secondinterval.length; j++) {
        if (firstinterval[i][0] == secondinterval[j][0] && (firstinterval[i][1] != secondinterval[j][1] || firstinterval[i][3] != secondinterval[j][3])) {
          updated.push(secondinterval[j][0] + "-" + secondinterval[j][2], secondinterval[j][1] + ":" + secondinterval[j][3])
        }

      }
    }
    return updated;
  }


});
