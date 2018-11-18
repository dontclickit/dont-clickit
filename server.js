function clickBait(){ 
    var links = ["https://twitter.com", "https://google.com"];

    algoliasearch = require("algoliasearch");

    var client = algoliasearch("CBJLT1KBQH", "34a9f24952e53d2ae19791c40a508c24");
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

client.search(queries, function searchCallback(err, content) {
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
});

}