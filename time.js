function updateClock() {
    var currentTime = new Date();
    var formattedTime = currentTime.toLocaleTimeString();
    document.getElementById('current-time').textContent = formattedTime;
  }
  
  setInterval(updateClock, 1000);
  updateClock();