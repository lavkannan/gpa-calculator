
$(document).ready( function() {

	$("#new").click( function() {
		chrome.tabs.create({url: "calc.html"});
	});

	// Inject the content script into the current page
	chrome.tabs.executeScript(null, { file: 'background.js' }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  }); 

});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
  	// console.log("sender: " + sender);
  	// console.log("request: " + request);
  	// console.log("request.source:  " + JSON.parse(request.source));
    //  message.innerText = JSON.parse(request.source);

    var arr = JSON.parse(request.source);
    arr = arr.filter(function(x) {
    	// if(x) 
    	// 	return true;
    	// return false;
    	return x;
    });
    console.log(arr);
    message.innerText = arr;
  }
});
