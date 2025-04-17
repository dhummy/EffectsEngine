// ===== CONFETTI ===== //

function launchConfettiOverlay(options = {}) {
    const {
      quantity = 100,
      emoji = false,
      emojis = ["🎉", "✨", "🎈", "💫"],
      colorRange = [0, 360],
      durationRange = [2000, 4000],
      rainbowMode = false, // Rainbow Mode (true/false)
      screenFlash = false, // Flash Effect (true/false)
      blinkConfetti = false, // Shining Confetti (true/false)
      swingEffect = false, // Confettin Swing Effect (true/false)
    } = options;
  
    const overlay = document.getElementById('confetti-overlay');
    overlay.style.display = 'block';
  
    if (screenFlash) {
        overlay.style.backgroundColor = 'white';
        setTimeout(() => {
          overlay.style.backgroundColor = 'transparent';
        }, 200);
      }
  
    for (let i = 0; i < quantity; i++) {
      const confetti = emoji ? document.createElement('span') : document.createElement('div');
      const hue = Math.floor(Math.random() * (colorRange[1] - colorRange[0]) + colorRange[0]);
      const left = `${Math.random() * 100}vw`;
      const top = `-${Math.random() * 100}px`;
      const angle = Math.random() * 360;
      const rotate = `${Math.random() * 360}deg`;
      const delay = Math.random() * 1000;
      const fallDuration = Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0];
  
      if (emoji) {
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.fontSize = `${Math.random() * 20 + 10}px`;
        confetti.style.display = 'inline-block';
      } else {
        confetti.classList.add('confetti');
        confetti.style.setProperty('--hue', hue);
      }
  
      confetti.classList.add('confetti-emoji');
      confetti.style.position = 'absolute';
      confetti.style.left = left;
      confetti.style.top = top;
      confetti.style.transform = `rotate(${rotate})`;
      confetti.style.opacity = 1;
      confetti.style.pointerEvents = 'none';
      confetti.style.transition = `opacity 1s ease-out`;
      
      // Rainbow Mode
      if (rainbowMode) {
        confetti.style.animation = `fall-rainbow ${fallDuration / 1000}s ease-out ${delay / 1000}s forwards`;
      } else {
        confetti.style.animation = `fall ${fallDuration / 1000}s ease-out ${delay / 1000}s forwards`;
      }
  
      // Shinning Effect  (blink)
      if (blinkConfetti) {
        confetti.style.animation += `, blink 1s linear infinite`;
      }
  
      // Swing Confetti Effect (Swing)
      if (swingEffect) {
        confetti.style.animation += `, fall-swing ${fallDuration / 1000}s ease-out ${delay / 1000}s forwards`;
      }
  
      overlay.appendChild(confetti);
  
      setTimeout(() => {
        confetti.style.opacity = 0;
        setTimeout(() => confetti.remove(), 1000);
      }, fallDuration + delay);
    }
  
    setTimeout(() => {
      overlay.style.display = 'none';
    }, durationRange[1] + 2000);
}
  
// ===== SHAKE ===== //

function launchShake({
    element = 'body', // element to shake, it can be a ".element" or even a "#element" too
    duration = 500, // Controls the duration of the shake animation
    strength = 'normal', // Options: "weakest", "weak", "normal", "strong" and "very strong"
    flash = false // Enables or desables the flash effect
  } = {}) {
    const el = document.querySelector(element);
    if (!el) return;
  
    // Optional flash
    if (flash) {
      const flashEl = document.createElement('div');
      flashEl.style.position = 'fixed';
      flashEl.style.top = 0;
      flashEl.style.left = 0;
      flashEl.style.width = '100vw';
      flashEl.style.height = '100vh';
      flashEl.style.backgroundColor = 'white';
      flashEl.style.opacity = '0.8';
      flashEl.style.zIndex = '9999';
      flashEl.style.pointerEvents = 'none';
      flashEl.style.transition = 'opacity 0.4s ease-out';
      document.body.appendChild(flashEl);
      setTimeout(() => {
        flashEl.style.opacity = '0';
        setTimeout(() => flashEl.remove(), 400);
      }, 50);
    }
  
    const strengthMap = {
      'weakest': { class: 'shake-xs', time: 300 },
      'weak':    { class: 'shake-sm', time: 400 },
      'normal':  { class: 'shake-md', time: 500 },
      'strong':  { class: 'shake-lg', time: 600 },
      'very strong': { class: 'shake-xl', time: 800 }
    };
  
    const { class: shakeClass, time: animTime } = strengthMap[strength] || strengthMap['normal'];
  
    let interval;
    const repeatShake = () => {
      el.classList.remove(shakeClass); // reset first in case it's still active
      void el.offsetWidth; // force reflow
      el.classList.add(shakeClass);
    };
  
    repeatShake(); // first run
    interval = setInterval(repeatShake, animTime);
  
    setTimeout(() => {
      clearInterval(interval);
      el.classList.remove(shakeClass);
    }, duration);
}

