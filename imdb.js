var cheerio = require('cheerio');
var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();

app.get('/scrape', function(req, res){
    //could increment on ID to pull more movies
    var url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function(err, response, html){
        if(!err){
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = {title : "", release : "", rating : ""};
            
            $('.title_wrapper').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                json.title = title;
            });

            $('.titleYear').filter(function(){
                var data = $(this);
                release = data.text();
                json.release = release;
            });

            $('.ratingValue').filter(function(){
                var data = $(this);
                rating = data.children().first().text();
                json.rating = rating;
            });
        }

        fs.writeFile('imdbOut.json', JSON.stringify(json, null, 4), function(err){
            console.log('data written to imdbOut.json');
        });

        res.send('check your terminal');

    });
});

app.listen('8081');
console.log('listening on port 8081');
exports = module.exports = app;
