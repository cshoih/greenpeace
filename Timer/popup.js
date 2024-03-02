let timerInterval;
let endTime;
let elapsedTime;

function startTimer() {
  // Set the timer duration (in minutes)
  const minutesEntered = parseInt(document.getElementById('textInput').value);
  console.log('Entered minutes:', minutesEntered);
  
  // Calculate the end time
  const now = new Date();
  endTime = now.getTime() + (minutesEntered * 60 * 1000);
  
  // Update the display immediately
  updateTimerDisplay();
  
  // Start the countdown
  timerInterval = setInterval(function() {
    // Calculate the elapsed time
    const now = new Date();
    elapsedTime = Math.round((endTime - now.getTime()) / 1000);
    
    // Update the display
    updateTimerDisplay();
    
    // Check if timer has reached zero
    if (elapsedTime <= 0) {
      alert('DoomShot Timer Complete!');
      clearInterval(timerInterval);
    }
  }, 1000); // Update every second
}

function updateTimerDisplay() {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  document.getElementById('timerValue').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startTimer').addEventListener('click', startTimer);
});