chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.executeScript(tab.id, { file: "content.js" }, function(){
		//console.log(results);
			
	    	chrome.tabs.sendMessage(tab.id, {"type":"get_urls"}, function(results){
			//console.log(results);
			//send results to get bad ones
			$.ajax({
				type: "POST",
				url:'http://localhost:8090/r',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: JSON.stringify({links:results}),
				success: function(data){
					console.log(data);
					chrome.tabs.sendMessage(tab.id, {"type":"bad_urls", "body":data});
				}
			});
			
		});
	});
});



chrome.contextMenus.create({
	id:"context", 
	title:"report link",
	contexts:["link"],
	onclick:function(linkUrl){
		$.ajax({
			type: "POST",
			url:'http://localhost:8090/report',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({link:linkUrl.linkUrl}),
			success: function(data){console.log(data);}
		});
	}
});
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  $.ajax({
  type: "POST",
  url:'http://localhost:8090/r',
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  data: JSON.stringify({max:100,links:["https://twitter.com","youtube.com"]}),
  success: function(data){console.log(data);}
  });
  
  //$.ajax({});
  
  chrome.tabs.executeScript({
    file: 'content.js'
  });
});*/