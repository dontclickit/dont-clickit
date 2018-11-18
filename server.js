var algoliasearch = require("algoliasearch");

var client = algoliasearch("CBJLT1KBQH", "34a9f24952e53d2ae19791c40a508c24");
var index = client.initIndex("database");

/*index.setSettings({
	searchableAttributes: ["link"]
}); */ //already run - makes only searchable by "link" attribute

var linksReceived = ["https://twitter.com"]; //will hold all the links sent by user

var linksArray = []; //will hold all links found
var reportsArray = []; //will hold all number of reports for each link
var clickBait = []; //0 for not clickbait, 1 for clickbait

for(var x of linksReceived){
	index.search(x).then(result => {
		//console.log(result.nbHits); //this shows number of records found
		for(var hit of result.hits) {
			console.log(hit.link);
			linksArray.push(hit.link);
			reportsArray.push(hit.reports);
			clickBait.push(0)
		}
		console.log(linksArray);
		console.log(reportsArray);
		console.log(clickBait);

		for(var i = 0; i < linksArray.length; i++) {
			if(reportsArray[i] > 100){ //this is how we determin clickbait articles at the moment
				clickBait[i] = 1;
			}
		}

		console.log(linksArray);
		console.log(reportsArray);
		console.log(clickBait);



	})};


