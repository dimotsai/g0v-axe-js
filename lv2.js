var events = require('events');
var request = require('request');
var cheerio = require('cheerio');

var EventEmitter= events.EventEmitter;
var ee =  new EventEmitter();
var answer = [];

ee.on('finish', function () {
    var all = [];
    for (var i in answer) {
        all = all.concat(answer[i]);
    }
    console.log(JSON.stringify(all));
});

for (var page = 1; page <= 12; ++page) {
    request({
        uri: 'http://axe-level-1.herokuapp.com/lv2/?page=' + page
    }, function (error, response, body) {
        var $ = cheerio.load(body);

        var arr = [];

        $('tr').each(function() {
            var tds = $(this).children('td');
            arr.push({
                town    : $(tds[0]).text(),
                village : $(tds[1]).text(),
                name    : $(tds[2]).text()
            });
        });

        arr = arr.slice(1);

        answer.push(arr);

        if (answer.length === 12) {
            ee.emit('finish')
        }
    });
}
