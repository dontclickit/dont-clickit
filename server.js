var algoliasearch = require("algoliasearch");

var client = algoliasearch("CBJLT1KBQH", "34a9f24952e53d2ae19791c40a508c24");
var index = client.initIndex("database");

/*index.setSettings({
	searchableAttributes: ["link"]
}); */ //already run - makes only searchable by "link" attribute

index.search("3").then(result => {
	console.log(result.nbHits); //this shows number of records found
	for(var hit of result.hits) {
		console.log(hit);
	}
});