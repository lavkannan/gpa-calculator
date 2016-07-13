
var dataArray = null;

$(document).ready( function() {

	$("#new").click( function() {
		chrome.tabs.create({url: "calc.html"});
	});

	$("#import").click( function() {

		// Inject the content script into the current page
		chrome.tabs.executeScript(null, { file: "background.js" }, function() {
	    	// If you try and inject into an extensions page or the webstore/NTP you'll get an error
		    if (chrome.runtime.lastError) {
		      message.innerText = "There was an error injecting script : \n" + chrome.runtime.lastError.message;
		    }
		}); 
	});

});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  	if (request.action === "putGrades") {
	
    	dataArray = JSON.parse(request.source);
    	dataArray = dataArray.filter(function(x) {
    		return x;
    	});
    	console.log(dataArray);
    	message.innerText = JSON.stringify(dataArray);
	
    	//create new tab 
    	chrome.tabs.create({url: "calc.html"});

  	}

  	// sent from newtab-contentscript, to get the source
    else if(request.action === "getDataArray") {
        sendResponse({ source: waitForDataArr() });
    }
});

function waitForDataArr(){
    if(dataArray) {
        return JSON.stringify(dataArray);
    
    } else {
        setTimeout(waitForDataArr(), 150);
    }
}


function compareTerms(first, second) {

	
}


