var request = require("request");
var cheerio = require("cheerio");

//try change to pass in zip as parameter
var url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + process.argv[2];

//pipe to slack?
//append city name?

request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        var $ = cheerio.load(body);
        var temperature = $("[data-variable='temperature'] .wx-value").html();
        console.log("It’s " + temperature + " degrees Fahrenheit.");
    } 
    else {
        console.log("We’ve encountered an error: " + error);
    }
});
