chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'startTimer') {
    const timeSlot = parseInt(message.timeSlot, 10) * 60 * 1000; // Convert minutes to milliseconds
    const interval = timeSlot / 10; // Divide the time slot into 10 intervals for 10 screenshots
    let screenshotCount = 0;

    const takeScreenshot = () => {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, function(dataUrl) {
        // Save screenshot locally 
        screenshotCount++;
        if (screenshotCount < 10) {
          setTimeout(takeScreenshot, Math.random() * interval); // Schedule next screenshot
        }
      });
    };

    setTimeout(takeScreenshot, Math.random() * interval); // Start taking screenshots
  }
});

