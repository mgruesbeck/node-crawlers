var request = require('request');
var cheerio = require('cheerio');

//pass zip as parameter
var url = 'http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=' + process.argv[2];

//pipe to slack?

request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        var $ = cheerio.load(body, {normalizeWhitespace: true});
        var temperature = $('.wx-value', '#curTemp').text();
        var area = $('.city-nav-header', '#location').text();
        console.log('It’s ' + temperature + ' degrees Fahrenheit in ' + area.trim() + '.');
    } 
    else {
        console.log('We’ve encountered an error: ' + error);
    }
});
