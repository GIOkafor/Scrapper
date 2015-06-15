/*
***********************************
TO-DO HAVE SEPERATE JS FOR DOWNLOADING AND EXTRACTING CERTAIN
	CERTAIN BITS OF INFO AS PER: http://code.tutsplus.com/tutorials/introduction-to-express--net-33367
	INCLUDE FUNCTIONS TOO


TO-DO : download contents from scraper api following tut example 
and store in app.locals
then display on web page from app.locals
************************************
*/
var express = require('express'),
 url = require('url'),
 jade = require('jade'),
 ejs = require('ejs'),
 http = require('http');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/resultset');

var app = express();

var port = 1337;

//set views directory and view engine
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);//double line
app.engine('html', ejs.renderFile);

console.log('Running on port localhost:' + port);
app.listen(port);

//make db accessible to app
app.use(function (req, res, next) {
	//db in this instance is that defined above on line:21
	req.db = db;
	next();
})

// Utility function that downloads a URL and invokes
// callback with the data.
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

var url = "http://api.import.io/store/data/f3644492-122e-47c4-be7a-5c15227a04b3/_query?_user=c3448282-0a91-4f70-bb22-dc8750ab84e0&_apikey=c3448282-0a91-4f70-bb22-dc8750ab84e0%3A4JvZxhSBboaL1arotCuAdabXLc%2BPZfHy0MNvnawvW2bBFCBrAIzL4C4KxGsuRvJ%2B4XufHHdoK5cXqyDtdp7FNQ%3D%3D"

/*
Download and store data to db and display on results page  
*/
download(url, function(data) {
  if (data) {
    var offs = JSON.parse(data);
    console.log(offs.results[0]);
    //app.locals = offs.results[0];


//display results from db
app.get('/results', function (req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function (e, docs) {
		res.render('results', {
			"results" : docs
		});
	});
});

//store values from API query to db
app.post('/addresults', function (req, res) {
	// set internal db variable
	var db = req.db;

	//store results downloaded earlier 
	var resultset = offs.results;

	//set collection
	var collection = db.get('usercollection');

	//submit to db
	collection.insert(resultset, function (err, doc) {
		if(err){
			//if failed return error
			res.send("there was a problem adding to db");
		}
		else{
			//forward to results page
			res.redirect("results");
		}
	});
});


  }
  else console.log("error");  
});


/* GET New User page. */
app.get('/newuser', function (req, res) {
	res.render('newuser', {title: 'Add New User'})
});


/*
//locals to be used 
app.locals = {
	uname: 'Ik',
	vehicle: "AudiTT",
	terrain: "Asphalt",
	climate: "Tropics",
	location: "Unknown"
};*/

app.get('/', function (req, res) {
	res.render('main_jade');
})


//jade stuff
app.get('/jade', function (req, res){
	res.render('user_jade');
});

//ejs html stuff
app.get('/ejs', function (req, res){
	app.render('user_ejs.html', function(err, renderedData){
		res.send(renderedData);
	});
});



/*
MAKE TEMPLATE FOR VIEWS- ITERATING OVER MULTIPLE ELEMENTS

app.get('/', function (req, res) {
	var response = ' <html><head><title>Simple send</title></head>' +
					'<body><h1>Hello from express</h1></body></html>';

	res.status(200);

	res.set({
		'Content-Type': 'text/html',
		'Content-Length': response.length
	});

	res.send(response);
	console.log('Response finished? ' + res.finished);
	console.log('\nHeaders Sent: ');
	console.log(res.headerSent);
});

app.get('/error', function(req, res){
	res.status(400);
	res.send("This is a bad request.");
});

app.get('/scrape', function(req, res){

});
*/