let screenshotCount = 0;
let timerInterval;
let endTime;
let elapsedTime;

function startTimer() {
  const minutesEntered = parseInt(document.getElementById('textInput').value);
  console.log('Entered minutes:', minutesEntered);

  const now = new Date();
  endTime = now.getTime() + (minutesEntered * 60 * 1000);
  randomiser(minutesEntered);
  updateTimerDisplay();

  timerInterval = setInterval(function() {
    const now = new Date();
    elapsedTime = Math.round((endTime - now.getTime()) / 1000);
    updateTimerDisplay();

    if (elapsedTime <= 0) {
      alert('DoomShot Timer Complete!');
      clearInterval(timerInterval);
    } 
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  document.getElementById('timerValue').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function randomiser(timeSlot) {
  const times = [];
  timeSlot = timeSlot * 60;

  for (let i = 0; i < 10; i++) {
    times.push(Math.round(Math.random() * timeSlot))
  }
  times.sort((a, b) => a - b)
  console.log("Random time intervals:", times)
    startCapturingScreenshots(times)
}
function startCapturingScreenshots(times) {
  times.forEach((interval) => {
    captureInterval = setTimeout(() => {
      captureAndDownloadScreenshot()
    }, interval * 1000);
  });
}
function captureAndDownloadScreenshot() {
  chrome.tabs.captureVisibleTab(null, {format: 'jpeg'}, (dataUrl) => {
    if (chrome.runtime.lastError) {
      console.error('Error capturing screenshot:', chrome.runtime.lastError.message);
      return;
    }
    chrome.downloads.download({
      filename: `screenshot_${screenshotCount + 1}.jpg`,
      url: dataUrl,
      saveAs: false
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error downloading screenshot:', chrome.runtime.lastError.message);
      }
    }); 
  });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startTimer').addEventListener('click', startTimer);
});


