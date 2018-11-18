// fetchFromAlgolia(processor())
// function processor() {
//    seen = Set()
//    return function(result) {
//	      if seen result then do nothing else process result
//    }
// }

function findCLickbaitLinks(after) {
	var algoliasearch = require("algoliasearch");

	var client = algoliasearch("CBJLT1KBQH", "34a9f24952e53d2ae19791c40a508c24");
	var index = client.initIndex("database");

	/*index.setSettings({
		searchableAttributes: ["link"]
	}); */ //already run - makes only searchable by "link" attribute

	var linksReceived = ["https://twitter.com", "https://google.com"]; //will hold all the links sent by user

	var linksArray = []; //will hold all links found
	var reportsArray = []; //will hold all number of reports for each link
	var clickBait = []; //0 for not clickbait, 1 for clickbait
	var newList = [];
	for(var i = 0; i < linksReceived.length; i++){
		x = linksReceived[i]
		console.log(x);
		index.search(x).then(result => {

			// after(result);
			//console.log(result.nbHits); //this shows number of records found
			for(var hit of result.hits) {
				//console.log(hit.link);
				linksArray.push(hit.link);
				reportsArray.push(hit.reports);
				clickBait.push(0)
			};
			//console.log(linksArray);
			//console.log(reportsArray);
			//console.log(clickBait);

			for(var i = 0; i < linksArray.length; i++) {
				if(reportsArray[i] > 2){ //this is how we determine clickbait articles at the moment
					clickBait[i] = 1;
				};
			};

			//console.log(linksArray);
			//console.log(reportsArray);
			//console.log(clickBait);

			for(var i = 0; i < linksArray.length; i++){

				if(clickBait[i] == 1){
					newList.push(linksArray[i]);

				};
			};
			
			var y = new Set(newList); //remove all duplicates
			
			//console.log(y);
			console.log(x);
			


		})
	};

	}

function createJson(links){

	console.log(links);


}

findCLickbaitLinks()

