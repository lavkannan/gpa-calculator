
// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
	action: "getSource",
	source: getRowString(document)
});

function getRowString(document_root) {

	// str += window.location.href;
	console.log(window.location.href);

	var elems = document_root.querySelectorAll(".PSEDITBOX_DISPONLY, .PSHYPERLINK");
	// var elems = document_root.getElementById("CRSE_HIST$scroll$0").childNodes;
	var data = new Array(elems.length/2);
	// var elems = $("document_root").find(".PSLEVEL1GRIDODDROW");
	// str += "  " + elems.length;

	// $(".PSLEVEL1GRIDODDROW").each(function() {
	// 	console.log($(this).text);
	// 	str += $(this).text() + " ";
	// 	str += " stuff ";
	// });

	// elems.forEach(function(entry) {
	// 	str += entry.textContent + " ";
	// });

	for (var i = 0; i < elems.length; i++) {
		// str += elems[i].textContent + " ";
		var text = elems[i].textContent;
		if(text && data[data.length-1] !== text)
			data.push(text);
	}
	return JSON.stringify(data);

}

 //    source: {
	//     'title': document.title,
	//     'url': window.location.href,
	//     'summary': window.getSelection().toString(),
	// }