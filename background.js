// / background script

console.log("hh");
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    // The user clicked the button!
    // 'tab' is an object with information about the current open tab
    var msg = {
        message: "user clicked!",
    };
    console.log("clicked");
    chrome.tabs.sendMessage(tab.id, msg);
}

// e.preventDefault();
