document.addEventListener('DOMContentLoaded', function() {
  var captureBtn = document.getElementById('captureBtn');
  captureBtn.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'takeScreenshot'});
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'displayScreenshot') {
    var screenshotContainer = document.getElementById('screenshotContainer');
    screenshotContainer.innerHTML = '<img src="' + message.screenshotDataUrl + '" alt="Screenshot">';
  }
});

