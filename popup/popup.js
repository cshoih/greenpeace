document.addEventListener('DOMContentLoaded', function() {
    var captureBtn = document.getElementById('captureBtn');
  
    captureBtn.addEventListener('click', function() {
      chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
        var img = document.createElement('img');
        img.src = dataUrl;
        document.body.appendChild(img);
      });
    });
  });
