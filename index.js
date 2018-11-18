var express = require('express');
var mysql=require('mysql');
algoliasearch = require("algoliasearch");

var client = algoliasearch("CBJLT1KBQH", "34a9f24952e53d2ae19791c40a508c24");

var app = express();
var temp=false;
/*var sql = "IF EXISTS (SELECT * FROM Xlptx42_durhack.reports WHERE link="+request.body["link"]+
		") UPDATE Xlptx42_durhack.reports SET reports= reports +1 WHERE link = "+request.body["link"]+
		" ELSE"+
		" INSERT INTO Xlptx42_durhack.reports VALUES("+request.body["link"]+", 1,0)";*/
var con=mysql.createConnection({
	host: "myeusql.dur.ac.uk",
	user: "lptx42",
	password: "i5pswich",
	database: "Xlptx42_durhack"
});
app.use(express.json());

app.post('/report', function(request, response){
  console.log(request.body);
  response.send(request.body["MyKey"]);
  con.query("UPDATE reports SET reports = reports +1 WHERE link =  '"+request.body["link"]+"'", function (err, result) {
    if (err) throw err;
    //console.log("Result: " + result);
  });
  con.query("SELECT reports FROM reports WHERE link='"+request.body["link"]+"'", function (err, result) {
    if (err) throw err;
    temp=result;
  });
  console.log(temp);
  if(! temp){
	con.query("INSERT INTO reports VALUES('"+request.body["link"]+"',1,0,0)", function (err, result) {
    if (err) throw err;
  });
  temp = false;
  };
});

app.post('/r', function(req, resp){
  //console.log(req);
  var links = req.body['links'];
  console.log(links);
  //var links = ["https://twitter.com", "https://google.com"];

  var queries = [];

  var linksArray = []; //will hold all links found
  var reportsArray = []; //will hold all number of reports for each link
  var newList = []; //will be what is returned to user

  for (x of links){
    queries.push({
	indexName: 'database',
	query: x
    });
  }

  client.search(queries, function searchCallback(err, content,resp) {
    if (err) throw err;

	for(var i = 0; i < queries.length; i++){
	linksArray.push(content.results[i].hits[0].link);
	reportsArray.push(content.results[i].hits[0].reports);
	}

	for(var i = 0; i < linksArray.length; i++){
	  if(reportsArray[i] > 100){ //this is how we determine if a link is clickbait
		newList.push(linksArray[i]);
      }
    }

    console.log(newList);
    resp.send(newList);
    });
  //resp.send({'query':1});
});

app.listen(8090)