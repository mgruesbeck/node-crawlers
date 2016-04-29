var request = require('request');
var fs = require('fs');

request
    .get('http://melvingruesbeck.com')
    .on('error', function(err) {
        console.log(err)
    })
    .pipe(fs.createWriteStream('melvingruesbeck.html'))
