
$(document).ready( function() {

	$("#new").click( function() {
		chrome.tabs.create({url: "calc.html"});
	});

});