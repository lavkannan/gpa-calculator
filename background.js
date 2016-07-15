
var dataArray;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  	if (request.action === "putGrades") {
	
    	dataArray = JSON.parse(request.source);
    	dataArray = dataArray.filter(function(x) {
    		return x;
    	});
    	console.log(dataArray);
    	// message.innerText = count + "\n" + JSON.stringify(dataArray);
    	count++;
	
    	//create new tab 
    	chrome.tabs.create({url: "calc.html"});

    	return false;
  	}

  	// sent from newtab-contentscript, to get the source
    else if(request.action === "getDataArray") {
        sendResponse({ source: dataArray });
    }
});

function waitForDataArr(){
    if(dataArray) {
        return JSON.stringify(dataArray);
    
    } else {
        // setTimeout(waitForDataArr(), 250);
        return "dataArray not set";
    }
}

