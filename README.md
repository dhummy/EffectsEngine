## Hi and welcome to 🎀**Dhummy's Effect Pack**🎀 (v1.0)
### In this quick guide, we'll explore the basics of my simple effect pack, which includes a few fun and useful effects to enhance your website or application. Let's dive in!

# Effect Pack Basics
> Note: If you are wondering "i need to install something?", no. My amazing pack doesn't need additional tool, it can run just smooth on your browser.

### The pack is very simple and changeble functions, so you can set it up real quick in any html page. 

# Effect: "🎉 CONFETTI 🎉"
### This effect consists of an overlay, when the user executes the functions, BOOM there will be confetti everywhere, and also some additional settings like: flash, swing, rainbow effect or even personalize your own emojis to display. So let's set this up

## 1. In the HTML file, add the following code:

```html
<div id="confetti-overlay"></div>
```
- To add the overlay element
```html
<script src="path/to/the/file/EffectEngine.js"></script>
```
- To add the script that will handle the effect. 
- **Make sure to replace "path/to/the/file/EffectEngine.js" with the actual path to the script**.
```html
<link rel="stylesheet" href="path/to/the/file/Effects.css">
```
- To add the CSS styles for the effect. 
- **Make sure to replace "path/to/the/file/Effects"**.

## 2. In the CSS file, add the following code:

```CSS
/* ===== CONFETTI ===== */

#confetti-overlay {
  position: absolute;
  top: 50%;
  left:50%;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
  display: none;
  transform: translate(-50%, -50%);
}

.confetti {
  width: 10px;
  height: 10px;
  background-color: hsl(var(--hue), 70%, 60%);
  border-radius: 2px;
  will-change: transform, opacity;
}

.confetti-emoji {
  will-change: transform, opacity;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(120vh) rotate(720deg);
    opacity: 1;
  }
}

@keyframes fall-rainbow {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    background-color: hsl(var(--hue), 70%, 60%);
  }
  100% {
    transform: translateY(120vh) rotate(720deg);
    opacity: 1;
    background-color: hsl(calc(var(--hue) + 180), 70%, 60%);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes fall-swing {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, 25vh) rotate(90deg); }
  50% { transform: translate(-10px, 50vh) rotate(180deg); }
  75% { transform: translate(10px, 75vh) rotate(270deg); }
  100% { transform: translate(-10px, 120vh) rotate(360deg); }
}
```
- That code will handle the animation of the confetti emojis. The `will-change` property is used to hint the browser. 
- The `@keyframes` rules define the animation.
- The `--hue` variable is used to generate a rainbow effect.
- The `@keyframes fall-swing` rule is used to create a swinging effect.
- The `@keyframes blink` rule is used to create a blinking effect.
- The `@keyframes fall-rainbow` rule is used to create a rainbow effect.
- The `@keyframes fall` rule is used to create a falling effect.

## 3. In the Javascript (JS) file, add the following code to handle the animation of the confetti emojis:

```Javascript
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
  
      // Shinning Effect (blink)
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
```
- The code is written in JavaScript and uses HTML and CSS for styling and layout.
- The code is designed to create a confetti effect on a webpage, with customizable options for the type of confetti, its size, color, and animation. 
- The code uses the `requestAnimationFrame` function to create a smooth animation effect.
- The code also uses CSS variables to make the code more readable and maintainable.

## How to use:
### First, create or apply this code to you javascript file:
```Javascript
launchConfettiOverlay({
    quantity: 90,
    emoji: true,
    emojis: ["💻", "💥", "🌈", "💡", "📖", "⁉️", "💯", "⬆️"],
    colorRange: [0, 360],
    durationRange: [2000, 4000],
    rainbowMode: true,
    screenFlash: false,
    blinkConfetti: false,
    swingEffect: false,
}); launchConfettiOverlay();  // 🎉✨💥
```
### Now that we got all the code ready, let's change some stuff to your liking:
- Change the `quantity` to the number of confetti you want to see.
- Change the `emoji` to `true` or `false` to turn on or off the emojis.
- Change the `emojis` to the emojis you want to see.
- Change the `colorRange` to the range of colors you want to see.   
- Change the `durationRange` to the duration of the confetti effect.
- Change the `rainbowMode` to `true` or `false` to turn on or off the rainbow mode.
- Change the `screenFlash` to `true` or `false` to turn on or off the screen flash.
- Change the `blinkConfetti` to `true` or `false` to turn on or off the blink confetti.
- Change the `swingEffect` to `true` or `false` to turn on or off the swing effect.
### Now, you can run the code and see the confetti effect on your webpage!

# Effect: "🚨 SHAKE 🫨"
### This effect consists of a series of animations that create a shaking effect on the webpage. The animations are triggered by a function. So let's get started!

## 1. In the HTML file, add the following code, as the usual:

```html
<script src="path/to/the/file/EffectEngine.js"></script>
```
- To add the script that will handle the effect. 
- **Make sure to replace "path/to/the/file/EffectEngine.js" with the actual path to the script**.
```html
<link rel="stylesheet" href="path/to/the/file/Effects.css">
```
- To add the CSS styles for the effect. 
- **Make sure to replace "path/to/the/file/Effects"**.

## 2. In the CSS file, add the following code:

``` CSS
/* ===== SHAKE ===== */

@keyframes shakeKeyframesXS {
  0% { transform: translate(0, 0); }
  25% { transform: translate(1px, -1px); }
  50% { transform: translate(-1px, 1px); }
  75% { transform: translate(1px, 1px); }
  100% { transform: translate(0, 0); }
}

@keyframes shakeKeyframesSM {
  0% { transform: translate(0, 0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(-2px, 2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(-2px, -2px); }
  100% { transform: translate(0, 0); }
}

@keyframes shakeKeyframesMD {
  0% { transform: translate(0, 0); }
  15% { transform: translate(-4px, 4px); }
  30% { transform: translate(4px, -4px); }
  45% { transform: translate(-4px, -4px); }
  60% { transform: translate(4px, 4px); }
  75% { transform: translate(-3px, 3px); }
  100% { transform: translate(0, 0); }
}

@keyframes shakeKeyframesLG {
  0% { transform: translate(0px, 0px) rotate(0deg); }
  20% { transform: translate(-6px, 4px) rotate(1deg); }
  40% { transform: translate(6px, -6px) rotate(-1deg); }
  60% { transform: translate(-6px, -6px) rotate(2deg); }
  80% { transform: translate(6px, 6px) rotate(-2deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}

@keyframes shakeKeyframesXL {
  0% { transform: translate(0px, 0px) rotate(0deg); }
  10% { transform: translate(-10px, 8px) rotate(2deg); }
  20% { transform: translate(10px, -10px) rotate(-2deg); }
  30% { transform: translate(-8px, 8px) rotate(3deg); }
  40% { transform: translate(8px, -8px) rotate(-3deg); }
  50% { transform: translate(-12px, 12px) rotate(2deg); }
  60% { transform: translate(12px, -12px) rotate(-2deg); }
  70% { transform: translate(-10px, 10px) rotate(1deg); }
  80% { transform: translate(10px, -10px) rotate(-1deg); }
  90% { transform: translate(-8px, 8px) rotate(1deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}

.shake-xs {
  animation: shakeKeyframesXS 0.3s ease-in-out 1;
}

.shake-sm {
  animation: shakeKeyframesSM 0.4s ease-in-out 1;
}

.shake-md {
  animation: shakeKeyframesMD 0.5s ease-in-out 1;
}

.shake-lg {
  animation: shakeKeyframesLG 0.6s ease-in-out 1;
}

.shake-xl {
  animation: shakeKeyframesXL 0.8s ease-in-out 1;
}
```
- This CSS code defines four different animation styles for shaking elements, each with a different duration and intensity. 
- The classes `.shake-xs`, `.shake-sm`, `.shake-md`, `.shake-lg`, and `.shake -xl` can be used to apply these animations to selected elements. 

## 3. In the Javascript (JS) file, add the following code:

```Javascript
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
```
- The code runs an Shake animation into the selected element 
- The animation is customizable with the `strength` and `duration` parameters.
- The animation is also customizable with the `flash` parameter, which adds a white flash effect to the animation
- The code uses the `requestAnimationFrame` function to create a smooth animation.

## How to use:
### First, create or apply this code to you javascript file:
```Javascript
launchShake({
    element: '.PageButton',
    duration: 2000,
    strength: 'strong',
    flash: true
})
```
### Now that we got all the code ready, let's change some stuff to your liking:
- Change the `element` parameter to the element you want to apply the animation to.
- Change the `duration` parameter to the duration of the animation in milliseconds.
- Change the `strength` parameter to the strength of the animation. You can choose from 'weakest', 'weak', 'normal', 'strong', 'very strong'. If you want to use a custom strength, you can add it to the `strengthMap` object.
- Change the `flash` parameter to `true` if you want to add a white flash effect
### Now, you can run the code and see the SHAKE effect on your webpage!
