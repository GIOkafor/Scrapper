var request = require("request"),
    cheerio = require("cheerio"),
    rang = "1200_1500",
    url = "http://www.kijiji.ca/b-laptops/gta-greater-toronto-area/macbook/k0c773l1700272?ad=wanted&price=1200__1500";

 request(url, function (error, response, body) {
 	if(!error){
 		var $ = cheerio.load(body),
 			descrip = $("td.description a").html(),
 			price = $("td.price").html(),
 			date = $("td.posted").html();

 		console.log("FOUND:" + descrip + "   END.");
 		console.log("PRICE :" + price + "    END-PRICE");
 		console.log("DATE POSTED: " + date + "   END.");
 	}else{
 		console.log("We've encountered an error: " + error);
 	}
 });