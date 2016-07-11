
$(document).ready( function() {

	$("#new").click( function() {
		chrome.tabs.create({url: "calc.html"});
	});

	$("#import").click( function() {

		// Inject the content script into the current page
		chrome.tabs.executeScript(null, { file: 'background.js' }, function() {
	    	// If you try and inject into an extensions page or the webstore/NTP you'll get an error
		    if (chrome.runtime.lastError) {
		      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
		    }
		}); 
	});

});

chrome.runtime.onMessage.addListener(function(request, sender) {
  	if (request.action === "getSource") {
	
    	var arr = JSON.parse(request.source);
    	arr = arr.filter(function(x) {
    		return x;
    	});
    	console.log(arr);
    	message.innerText = arr;
    	var tabid = 0;
	
    	//create new tab 
    	chrome.tabs.create({url: "calc.html"}, function(tab){

    		//send message to new tab
			chrome.tabs.sendMessage(tab.id, {
				action: "getDataArray",
				source: JSON.stringify(arr)
			});
    	});

    	
	
  	}
});
