
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('aside');
const main = document.querySelector('main');
const nameForm = document.getElementById("nameForm");
const wheelContainer = document.getElementById("wheelContainer");
const spinButton = document.getElementById("spinButton");
const resetWheel = document.getElementById("resetWheel");
const settings = document.getElementById("setting");
const isOpen = sidebar.classList.contains('open');

let names = [];
let lastColor = null;
let theWheel;
let spinSound = new Audio('src/tick.mp3');  // Create audio object and load desired file.
let winningSound = new Audio('src/kids-yeah.mp3');
let randomIndex;

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    main.classList.toggle('open');
    const isOpen = sidebar.classList.contains('open');
    sidebarToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-gear"></i>';
    sidebar.style.flex = isOpen ? '3' : '0';
    sidebar.style.backgroundColor = isOpen ? '#d6d6d6':'white';
    main.style.flex = isOpen ? '7' : '10';
    sidebar.classList.toggle('closed', !isOpen);
    settings.style.display =  isOpen ? 'flex' : 'none';
});


nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();

  if (name) {
    names.push({ text: name, fillStyle: getRandomColor() });
    nameInput.value = "";
    updateWheel();
  }
});

resetWheel.addEventListener("click", () => {
  clearInterval(confettiInterval); // Clear the confetti interval
  let prizeWinnerDiv = document.getElementById("prizeWinner");
  prizeWinnerDiv.style.display = "none"; // Hide the prize winner div
  spinButton.disabled = false; // Enable the spin button
  resetWheel.disabled = true; // Disable the reset button
  spinButton.style.display = "block"; // Show the spinButton
  resetWheel.style.display = "none"; // Hide the resetWheel button
  names = []; // Clear the names array
  updateWheel(); // Update the wheel with the empty names array
});

spinButton.addEventListener("click", () => {
  resetWheel.style.display = "block"; // Show the resetWheel button
  spinTheWheel();
});

function updateWheel() {
  theWheel = new Winwheel({
    canvasId: "wheelCanvas",
    numSegments: names.length,
    segments: names,
    pins: names.length,
    pointerAngle : 0, 
    outerRadius: 230,
    innerRadius: 80,
    textMargin : 12,
    textFillStyle: 'white', // Set the text color to red
    textFontFamily : 'Oswald',
    textFontWeight : 'bold', 
    textFontSize: 36,    
    textOrientation: 'horizontal',
    textAlignment: 'center',
    rotationAngle: 45,
    animation: {
      type: "spinToStop",
      duration: 5,
      spins: 8,
      callbackSound : playSpinSound,    // Specify function to call when sound is to be triggered
      callbackFinished: alertPrize,
    },
  });

  spinButton.disabled = false;
}

function spinTheWheel() {
  const randomDuration = Math.random() * (10 - 5) + 5;
  spinButton.disabled= true;
  spinButton.style.display = "none"; // Show the spinButton
  resetWheel.disabled= false;
  theWheel.animation.duration = randomDuration;
  theWheel.startAnimation();
}


function getRandomColor() {
  // Define your color palette here
  const colorPalette = [
    "#ffbe0b",
    "#fb5607",
    "#ff006e",
    "#8338ec",
    "#3a86ff",
    "#2a9d8f",
    "#48cae4",
    "#70d6ff",   
  ];

  

  // Generate a random index based on the length of the color palette
  // and ensure it's different from the last color
  do {
    randomIndex = Math.floor(Math.random() * colorPalette.length);
  } while (colorPalette[randomIndex] === lastColor);

  // Update the last color and return the randomly selected color
  lastColor = colorPalette[randomIndex];
  return lastColor;
}


function playSpinSound()
{
    // Stop and rewind the sound (stops it if already playing).
    spinSound.pause();
    spinSound.currentTime = 0;

    // Play the sound.
    spinSound.play();
}

// Called when the animation has finished.
function stopSpinSound()
{
    // Stop and rewind the sound (stops it if still playing).
    spinSound.pause();
    spinSound.currentTime = 0;
}

function playWinSound() {
  
    // Stop and rewind the sound (stops it if already playing).
    winningSound.pause();
    winningSound.currentTime = 0;

    // Play the sound.
    winningSound.play();
}

   function createConfetti() {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    let interval = setInterval(function () {
      let particleCount = 50;
      // Use default values for all confetti, overriding only a few properties
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  
    return interval; // Add this line to return the interval
  }
  
  
  function alertPrize() {
    let winningSegment = theWheel.getIndicatedSegment();
    let prizeWinnerDiv = document.getElementById("prizeWinner");
    prizeWinnerDiv.innerHTML = `Congratulations ${winningSegment.text}!`;
    prizeWinnerDiv.style.display = "flex";
    confettiInterval = createConfetti(); // Store the confetti interval
    stopSpinSound();
    playWinSound();
  }

  