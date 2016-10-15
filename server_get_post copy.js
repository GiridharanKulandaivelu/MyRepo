var sys = require ('sys'), url = require('url'), http = require('http'), qs = require('querystring');
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var thresh="";
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.


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
		var url = 'mongodb://localhost:27017/my_database_name';
		MongoClient.connect(url, function (err, db) 
		{
  			if (err) {
    					console.log('Unable to connect to the mongoDB server. Error:', err);
    					sys.puts("not connected");
  					} 
  			else {
    					//HURRAY!! We are connected. :)
    					console.log('Connection established to', url);
    					sys.puts("connected");

    					// Get the documents collection
    					var collection = db.collection('sensordata');
    					sys.puts("db created");
    					//Create some users
    					var user1 = {Type: obj.Type, Name: obj.Name, Value: obj.Value};
    					//var user2 = {name: 'modulus user', age: 22, roles: ['user']};
    					//var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};
              if(obj.Type=="TEMPERATURE")
              {
                if(obj.Value >30)
                thresh="1";
              else
                thresh="0";
              }
    					// Insert some users
    					collection.insert([user1/*, user2, user3*/], function (err, result) {
      					if (err) {
        							console.log(err);
      							 } 
      					else {
        						console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      						 }
      					//Close connection
      					db.close();
    					});
  				 }
		});


		});
	response.writeHeader(200, {"Content-Type": "text/plain"});  
    response.write(thresh);  
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

