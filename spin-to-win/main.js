
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('aside');
const main = document.querySelector('main');
const nameForm = document.getElementById("nameForm");
const wheelContainer = document.getElementById("wheelContainer");
const spinButton = document.getElementById("spinButton");
const resetWheel = document.getElementById("resetWheel");
const isOpen = sidebar.classList.contains('open');

let names = [];
let lastColor = null;
let theWheel;
let audio = new Audio('src/tick.mp3');  // Create audio object and load desired file.
let randomIndex;

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    main.classList.toggle('open');
    const isOpen = sidebar.classList.contains('open');
    sidebarToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-gear"></i>';
    sidebar.style.flex = isOpen ? '4' : '0';
    main.style.flex = isOpen ? '6' : '10';
    sidebar.classList.toggle('closed', !isOpen);
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

spinButton.addEventListener("click", () => {
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
    textFontFamily : 'Oswald',
    textFontWeight : 'bold', 
    textFontSize: 32,    
    textOrientation: 'horizontal',
    textAlignment: 'center',
    rotationAngle: 45,
    animation: {
      type: "spinToStop",
      duration: 5,
      spins: 8,
      callbackSound : playSound,    // Specify function to call when sound is to be triggered
      callbackFinished: (indicatedSegment) => {
        alert(`The winner is: ${indicatedSegment.text}`);
        
        stopSound
      },
    },
  });

  spinButton.disabled = false;
}

function spinTheWheel() {
  const randomDuration = Math.random() * (10 - 5) + 5;
  spinButton.disabled= true;
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


function playSound()
{
    // Stop and rewind the sound (stops it if already playing).
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}

   // Called when the animation has finished.
   function stopSound()
   {
       // Stop and rewind the sound (stops it if still playing).
       audio.pause();
       audio.currentTime = 0;
   }


