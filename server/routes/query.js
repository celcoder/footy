
var router = require('express').Router();
var search = require('youtube-search');
module.exports = router;


router.get('/:criteria', function(req, res, next){

var opts = {
  maxResults: 10,
  key: 'AIzaSyB6z5O8u-Tyo2wTgw8UeMpN-JIFXOQHzfA',
  publishedAfter: '2016-08-02T00:00:00Z',
  videoSyndicated: 'true',
  type: 'video',
  videoEmbeddable: 'true',
  videoLicense: 'youtube',
};

search(req.params.criteria, opts, function(err, results) {
  if(err) return console.log(err);
     
     function getId(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length == 11) return match[2];
            else return 'error';
    }

    var myIds = results.map( result => getId(result.link));

    function getUrl(id) {
        return "https://www.youtube.com/embed/"+ id;
      }
    var embedCodes = myIds.map(getUrl); //the full url 
      // for (var code in embedCodes) { //for loop 
    res.send(embedCodes);
      // }
  })
})

