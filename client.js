var querystring = require('querystring');
var http = require('http');

var data = JSON.stringify({
        Type : "success",
        Name: "didit",
        Value :"100"
    });

var options = {
    host: '52.26.246.176',
    port: 8080,
    //path: '/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();