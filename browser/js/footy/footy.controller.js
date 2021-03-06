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
  $scope.displayData = ["hello", "game"];
  // <---------------------------modal box------------------------------------->
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

//<----to display the modal on change in Event ------>
  function display() {
    modal.style.display = "block";
    var audio = document.getElementById("audio");
    audio.play();
    setTimeout(function() {
      modal.style.display = "none";
    }, 7000)
  }

  btn.onclick = function(){
  display()
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
  var firstData = convert(matches);
  var secondData;

  setInterval(function() {
    secondData = FootyFactory.getScores()
      .then(function(res) {
        secondData = convert(res);
        console.log(secondData)
        return secondData;
      })
      .then(function(convertedData) {
        return diff(firstData, convertedData)
      })
      .then(function(final) {
        firstData = secondData;
        console.log(final);
        if(final.length) { 
          $scope.displayData = final; 
          display();  
        } 
        return final;
      })
  }, 10000)



  function convert(matches) {
    arr = []
    for (var i = 0; i < matches.length; i++) {
      matchArr = []
      var awayT = String(matches[i].awayTeam.name)
      var awayG = String(matches[i].awayGoals)
      var homeT = String(matches[i].homeTeam.name)
      var homeG = String(matches[i].homeGoals)
      matchArr.push(homeT, homeG, awayT, awayG);
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
