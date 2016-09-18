var sys = require ('sys'), url = require('url'), http = require('http'), qs = require('querystring');
 http.createServer(function (req, response) { 
 if(req.method=='POST') 
 { 
var body=''; 
req.on('data', function (data) 
{ 
body +=data; 
var obj= JSON.parse(body);
sys.puts(obj.Type);
sys.puts(obj.Name);
sys.puts(obj.Value);
console.log(body);
});
response.writeHeader(200, {"Content-Type": "text/plain"});  
    response.write("Data Received");  
    response.end();  
/* req.on('end',function(){ 
 var POST = qs.parse(body); 
 sys.puts(POST);
 console.log(POST); 
 });
 */
 } 
 else if(req.method=='GET') 
 {
	 var url_parts = url.parse(req.url,true); 
	 console.log(url_parts.query); 
 }
 }).listen(8080);
 sys.puts("listening to 8080");