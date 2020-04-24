var tabCount = 0;

var opt = {
	iconUrl: 'icon.png',
	type: 'basic',
	title: 'Hey!',
	message: 'Delete some tabs, ya ding dong',
	priority: 1,
};

var incrementTab = function(tab){
	tabCount++;
	console.log(tabCount);	
	sendToPopup(tabCount);
}

var decrementTab = function(tabId, removeInfo){
	tabCount--;
	console.log(tabCount);
	sendToPopup(tabCount);	
}

var sendToPopup = function(tabCount){
	chrome.extension.onConnect.addListener(function(port){
		 port.onMessage.addListener(function(msg) {
					console.log("message recieved " + msg); //see in background console
					port.postMessage(tabCount); //sends/posts message to popup
		 });
	})
	
	if(tabCount > 10){
		console.log("tab cap reached");
		chrome.notifications.create('', opt, function(){
			console.log("Last error:", chrome.runtime.lastError);
		});		
	}
}

chrome.tabs.query({currentWindow: true}, function(tabs){
	tabCount = tabs.length;
	sendToPopup(tabCount);
});

chrome.tabs.onCreated.addListener(function(tab){incrementTab(tab)});
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){decrementTab(tabId, removeInfo)});
