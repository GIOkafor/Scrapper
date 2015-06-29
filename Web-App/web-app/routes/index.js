var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var http = require('http');
var Result = mongoose.model('Result');
var url = "http://api.import.io/store/data/f3644492-122e-47c4-be7a-5c15227a04b3/_query?_user=c3448282-0a91-4f70-bb22-dc8750ab84e0&_apikey=c3448282-0a91-4f70-bb22-dc8750ab84e0%3A4JvZxhSBboaL1arotCuAdabXLc%2BPZfHy0MNvnawvW2bBFCBrAIzL4C4KxGsuRvJ%2B4XufHHdoK5cXqyDtdp7FNQ%3D%3D";

function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get results page
router.get('/results', function(req, res, next){
	Result.find(function(err, results){
		if(err){return next(err);}

		res.json(results);
	});
});

//post to db
router.post('/results', function(req, res, next){
	download(url, function(data) {
  		if (data) {
    		var offs = JSON.parse(data);
    		var results = new Result(offs.results[0]);
  		}
  		else console.log("error");

  		results.save(function(err, offs){
  			if(err){return next(err);}

  			res.json(results);
  		});
	});
});

module.exports = router;
