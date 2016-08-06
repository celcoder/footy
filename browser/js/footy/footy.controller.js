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

app.controller('FootyCtrl', function($scope, $state, reccentMatches, $sce, matches) {


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



});
