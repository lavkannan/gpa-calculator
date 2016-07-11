
// Send message containing course history table information to popup page
chrome.runtime.sendMessage({
	action: "getSource",
	source: getRowString(document)
});

function getRowString(document_root) {

	var elems = document_root.querySelectorAll(".PSEDITBOX_DISPONLY, .PSHYPERLINK");
	// var elems = document_root.getElementById("CRSE_HIST$scroll$0").childNodes;

	//not correct page
	if(elems.length === 0) {
		var dataArray = [];
	    dataArray[0] = Array(16).fill("");
		return JSON.stringify(dataArray);
	}

	var data = new Array(elems.length/2);
	// var elems = $("document_root").find(".PSLEVEL1GRIDODDROW");

	for (var i = 0; i < elems.length; i++) {
		// str += elems[i].textContent + " ";
		var text = elems[i].textContent;
		if(text && data[data.length-1] !== text)
			data.push(text);
	}
	return JSON.stringify(data);

}