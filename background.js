// / background script

console.log("hh");

function handleUpdated(tabId, changeInfo, tabInfo) {
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated
    if (changeInfo.status == "complete") {
        chrome.runtime.onMessage.addListener((msg, sender) => {
            // First, validate the message's structure.
            if (msg.from === "content" && msg.subject === "showPageAction") {
                // Enable the page-action for the requesting tab.
                chrome.pageAction.show(sender.tab.id);
            }
        });
        console.log("commm");
    } else {
        console.log("not");
    }
    // console.log("Updated tab: " + tabId);
    // console.log("Changed attributes: ");
    // console.log(changeInfo);
    // console.log("New tab Info: ");
    // console.log(tabInfo);
}

chrome.tabs.onUpdated.addListener(handleUpdated);
// chrome.browserAction.onClicked.addListener(buttonClicked);

// function buttonClicked(tab) {
//     // The user clicked the button!
//     // 'tab' is an object with information about the current open tab
//     var msg = {
//         message: "user clicked!",
//     };
//     console.log("clicked");
//     chrome.tabs.sendMessage(tab.id, msg);
// }

// // e.preventDefault();
