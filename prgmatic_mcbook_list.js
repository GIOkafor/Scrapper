var request = require("request"),
    cheerio = require("cheerio"),
    rang = "1200_1500",
    url = "http://www.kijiji.ca/b-laptops/gta-greater-toronto-area/macbook/k0c773l1700272?ad=wanted&price=1200__1500";

 request(url, function (error, response, body) {
 	if(!error){
 		var $ = cheerio.load(body),
 			table = $("tr").each(function (i) {
 				descrip = $("tr").eq(i).children("td.description").children("a").text(),
 				price = $("tr").eq(i).children("td.price").text(),
 				date = $("tr").eq(i).children("td.posted").text();

 				console.log("---------------- " + i + " ----------------");
 				console.log("FOUND:" + descrip + "   END.");
 				console.log("PRICE :" + price + "    END-PRICE");
 				console.log("DATE POSTED: " + date + "   END.");
 				i++;
 			})
 			
 	}else{
 		console.log("We've encountered an error: " + error);
 	}
 });