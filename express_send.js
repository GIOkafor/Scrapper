var express = require('express'),
 url = require('url'),
 jade = require('jade'),
 ejs = require('ejs');

var app = express();

var port = 1337;

//set views directory and view engine
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);//double lines
app.engine('html', ejs.renderFile);

console.log('Running on port localhost:' + port);
app.listen(port);

//locals to be used 
app.locals = {
	uname: 'Ik',
	vehicle: "AudiTT",
	terrain: "Asphalt",
	climate: "Tropics",
	location: "Unknown"
};

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