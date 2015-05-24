var request = require("request"),
	cheerio = require("cheerio"),
	url = "https://go.events.com/#/event/1214";

request(url, function (error, response, body) {
	if(!error){
		var $ = cheerio.load(body),
			events = $("[ellipsize-string='event.name'] .ng-binding").html();

		console.log("Events going on are " + events + ". check em out");
	}else{
		console.log("We've encountered an error: " + error);
	}
});