
var dataArray;
console.log("background script running");

chrome.browserAction.onClicked.addListener(function(tab) {
//     // Inject the content script into the current page
    console.log("clicked!");
	chrome.tabs.executeScript(null, { file: "content-script.js" });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  	if (request.action === "putGrades") {
	
    	dataArray = JSON.parse(request.source);
    	dataArray = dataArray.filter(function(x) {
    		return x;
    	});
    	console.log(dataArray);
	
    	//create new tab 
    	chrome.tabs.create({url : "calc.html"});

    	// return false;

  	}

  	// sent from calc.js, to get the source
    else if(request.action === "getDataArray") {
    	console.log(JSON.stringify(dataArray));
        sendResponse({ source : JSON.stringify(dataArray)});
    }
});

//TODO:
//scrape from any html table
//Every icon click will create new table, can add remove new grade tables 


