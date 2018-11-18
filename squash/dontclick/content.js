function getLinks() {
	var links = document.links;
	var jsonLinks = [];
	
	for(var i = 0; i < links.length; i++){
		jsonLinks.push(links[i].href);
		
		
	};
	/*var i;
	for(i = 0; i < links.length; i++){
		var newLink = new Object()
		newLink.name = "link" + i;
		newLink.url = links[i].href;
		var jsonString = JSON.stringify(newLink);
		jsonLinks.push(jsonString);
		
	};*/
	return jsonLinks;
};

function updateLinks(badlinks){
	var links = document.links;
	//window.alert(badlinks);
	for (var i of links){
		//window.alert(links[i].parentNode);
		//var orgText = links[i].innerHTML;
		if(i.classList.value=="yt-simple-endpoint inline-block style-scope ytd-thumbnail" && badlinks.indexOf(i.href)>=0){
			i.childNodes[1].childNodes[0].src="";
		}
		if(badlinks.indexOf(i.href)>=0){
			i.innerHTML = "---";
		}
	}
}

function sendLink(){
	window.alert("hello");
}

//chrome.tabs.sendMessage({\"type\":\"bad_link\",\"link\":node.id})\


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == "get_urls"){
		sendResponse(getLinks());
		//updateLinks();
		
	}
	if (request.type == "bad_urls"){
		updateLinks(request.body);
	}
});

