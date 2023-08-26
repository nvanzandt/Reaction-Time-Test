document.addEventListener('DOMContentLoaded', function() { 

  const body = document.querySelector('body');
  const direction1 = document.querySelector('#direction1'); 
  const direction2 = document.querySelector('#direction2'); 
  const timer = document.querySelector('#timer');
  const bestTime = document.querySelector('#best-time');

  let started = false;
  let signaled = false;
  let millisec = 0; // For timer increments
  let shortestTime; // For best time
  let interval; // For timer
  let timeout; // For signal delay


  const startTimer = function() { 
    timer.style.visibility = 'visible'; 
    // Create an interval that updates the timer every 1 ms
    interval = setInterval( ()=> { 
      millisec++;
      updateTimer(millisec);
    }, 1)
  }
  
  const updateTimer = function (millisec) { 
    timer.innerHTML = millisec + ' ms';
  }
  
  const pauseTimer = function() { 
    clearInterval(interval); 
  }

  const resetTimer = function() { 
    clearInterval(interval);
    millisec = 0;
    updateTimer(millisec);
    timer.style.visibility = 'hidden';
  }

  const startSignalDelay = function() {
    const startTime = Math.floor(Math.random() * 5) + 2; // Delay time in sec
    timeout = setTimeout( () => {
      body.style.backgroundColor = 'rgb(78, 255, 78)';
      direction1.innerHTML = 'Click!';
      startTimer();
      signaled = true;
    }, startTime * 1000);

  }

  const resetSignalDelay = function() { 
    clearTimeout(timeout); 
  }

  const updateBestTime= function() { 
    bestTime.innerHTML = `Best Time: ${millisec} ms`;
  }


  timer.style.visibility = 'hidden';

  this.onclick = () => { 
    if (!started) {
      resetTimer();
      startSignalDelay();
      started = true;
      body.style.backgroundColor = 'rgb(255, 78, 78)';
      direction1.innerHTML = 'Waiting...';
      direction2.innerHTML = '';
    }
    else if(!signaled) { 
      resetSignalDelay();
      started = false;
      body.style.backgroundColor = 'rgb(78, 78, 255)';
      direction1.innerHTML = 'Too soon!';
      direction2.innerHTML = 'Click to try again.';
    }
    else if (signaled) { 
      pauseTimer();
      started = false;
      signaled = false;
      
      // If it is first time or shortest time, update best time
      if (shortestTime == null || millisec < shortestTime) {
        shortestTime = millisec;
        updateBestTime();
      }
     
      body.style.backgroundColor = 'rgb(78, 78, 255)'; 
      direction1.innerHTML = 'Click to keep going.';
    }
  }

});