//import express package
var express = require("express");

//import mongodb package
var mongodb = require("mongodb");

//MongoDB connection URL - mongodb://host:port/dbName
var dbHost = "mongodb://localhost:27017/my_database_name";

//DB Object
var dbObject;

//get instance of MongoClient to establish connection
var MongoClient = mongodb.MongoClient;

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});

function getData(responseObj){
  //use the find() API and pass an empty query object to retrieve all records
  dbObject.collection("sensordata").find({"Type" : {$regex : ".*TEMPERATURE.*"}}).toArray(function(err, docs){
    if ( err ) throw err;
    var TypeArray = [];
    var NamePrices = [];
    var ValuePrices = [];

    for ( index in docs){
      var doc = docs[index];
      //category array
      var Type = doc['Type'];
      //series 1 values array
      if(doc['Name']=="T1")
      {
      var Name = doc['Value'];
      NamePrices.push({"value" : Name});
      //TypeArray.push({"label": "T1"});
      }
    if(doc['Name']=="T2")
    {
      //series 2 values array
      var Value = doc['Value'];
      ValuePrices.push({"value" : Value});
      //TypeArray.push({"label": "T2"});
      }
      
    }

    var dataset = [
      {
        "seriesname" : "T1",
        "data" : NamePrices
      },
      {
        "seriesname" : "T2",
        "data": ValuePrices
      }
    ];

    var response = {
      "dataset" : dataset,
      "categories" : NamePrices
    };
    responseObj.json(response);
  });
}

//create express app
var app = express();

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Defining middleware to serve static files
app.use('/public', express.static('public'));
app.get("/fuelPrices", function(req, res){
  getData(res);
});
app.get("/", function(req, res){
  res.render("chart");
});

app.listen("3300", function(){
  console.log('Server up: http://localhost:3300');
});
