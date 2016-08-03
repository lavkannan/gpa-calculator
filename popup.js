
var dataArray = null;
var newCalc;

$(document).ready( function() {

	$("#new").click( function() {
        newCalc = true;
		chrome.tabs.create({url: "calc.html"});
	});

	$("#import").click( function() {

        newCalc = false;
        console.log("import clicked")

		// Inject the content script into the current page
		chrome.tabs.executeScript(null, { file: "content-script.js" }, function() {
	    	// If you try and inject into an extensions page or the webstore/NTP you'll get an error
		    if (chrome.runtime.lastError) {
		      message.innerText = "There was an error injecting script : \n" + chrome.runtime.lastError.message;
		    }
		}); 
        // chrome.tabs.create({url: "calc.html"});
	});

});

var count = 0;

