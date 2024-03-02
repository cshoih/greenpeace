chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'takeScreenshot') {
      chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
        chrome.runtime.sendMessage({action: 'displayScreenshot', screenshotDataUrl: dataUrl});
      });
    }
  });
  