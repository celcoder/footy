var router = require('express').Router();
module.exports = router;
var rp = require('request-promise');
// /api/scores

var d = new Date();
var d2 = new Date();
var d3 = new Date()

d2.setHours(d.getHours() +6);
d3.setHours(d.getHours()+7)

console.log(d2)
console.log(d3)

router.get('/', function (req, res, next) {

	var options = {
	    uri: 'https://api.crowdscores.com/api/v1/matches?from='+ d2 +'&to='+d3,
	    qs: {
	    },
	    headers: {
	        'x-crowdscores-api-key': 'a9a78b21cdb54205bdae5ce39f99b923'
	    },
	    json: true // Automatically parses the JSON string in the response 
	};
	 
	rp(options)
	    .then(function (matches) {
	    	res.json(matches);
	        // console.log('User has %d competitions', competitions.length);
	        // console.log(competitions);
	    })
	    .catch(function (err) {
	        // API call failed... 
	    });

})

// router.get('/scores', f)
// x-crowdscores-api-key: a9a78b21cdb54205bdae5ce39f99b923

