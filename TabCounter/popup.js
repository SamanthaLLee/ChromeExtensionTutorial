var count = 0;
var port = chrome.extension.connect({
		 name: "Popup/BG cxn"
});

port.postMessage("Success"); // sends msg to background

port.onMessage.addListener(function(msg) {
		 console.log("message recieved " + msg); //See in background console
		 count = msg;
		 document.getElementById("count").innerHTML = count;
});