var http = require("http");

function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on("end", function(){
			callback(data);
		});
	}).on("error", function(){
		callback(null);
	});
}

var cheerio = require("cheerio");

var url = "http://api.import.io/store/data/f3644492-122e-47c4-be7a-5c15227a04b3/_query?_user=c3448282-0a91-4f70-bb22-dc8750ab84e0&_apikey=c3448282-0a91-4f70-bb22-dc8750ab84e0%3A4JvZxhSBboaL1arotCuAdabXLc%2BPZfHy0MNvnawvW2bBFCBrAIzL4C4KxGsuRvJ%2B4XufHHdoK5cXqyDtdp7FNQ%3D%3D"

download(url, function(data) {
  if (data) {
    // console.log(data);
    var results= cheerio.load(data);
    .each(results, function(i, e) {
       console.log("start");
      console.log(e.image);
      console.log("end");
      var link = $(e).find("td>span>a");
     // var poster = $(e).find("username").text();
     
      console.log(link+": ["+link.html()+"]("+link.attr("href")+")");
      
    });
  }
});