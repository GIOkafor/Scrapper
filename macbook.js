var request = require("request"),
    cheerio = require("cheerio"),
    rang = "1200_1500",
    url = "http://www.kijiji.ca/v-laptops/mississauga-peel-region/looking-to-buy-a-15-macbook-pro-2012-or-newer/1072040759?enableSearchNavigationFlag=true";

 request(url, function (error, response, body) {
 	if(!error){
 		var $ = cheerio.load(body),
 			descrip = $("[itemprop='name'] h1").html(),
 			price = $("[itemprop='price'] strong").html(),
 			date = $("table").eq(0).children("tr").eq(0).children("td").html();

 		console.log("FOUND:" + descrip + "   END.");
 		console.log("PRICE :" + price + "    END-PRICE");
 		console.log("DATE POSTED: " + date + "   END.");
 	}else{
 		console.log("We've encountered an error: " + error);
 	}
 });