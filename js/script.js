const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('aside');
const main = document.querySelector('main');
const settings = document.getElementById('settings');
const button = document.getElementById('spin-button');
const audio = new Audio("https://rodgers.space/kelly/src/wheel.wav");
const wheel = document.getElementById('wheel');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  main.classList.toggle('open');


  const isOpen = sidebar.classList.contains('open');

  sidebarToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-gear"></i>';
  settings.style.visibility = 'visible';
  sidebar.style.flex = isOpen ? '4' : '0';
  main.style.flex = isOpen ? '6' : '10';
  sidebar.classList.toggle('closed', !isOpen);
});

button.addEventListener('click', () => {
  const x = 1024; //min value
  const y = 9999; //max value
  const deg = Math.floor(Math.random() * (x - y)) + y;
  const duration = 4000; // spinning duration in milliseconds
  
  button.style.backgroundColor = "red";
  button.disabled = true;
  //audio.play();

  let start;
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    if (elapsed < duration) {
      wheel.style.transform = `rotate(${deg * (elapsed / duration)}deg)`;
      requestAnimationFrame(animate);
    } else {
      wheel.style.transform = `rotate(${deg}deg)`;
      button.disabled = false;
      button.style.backgroundColor = "green";
    }
  };
  requestAnimationFrame(animate);
});
