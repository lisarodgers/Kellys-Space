const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('aside');
const main = document.querySelector('main');
const audio = new Audio("https://rodgers.space/kelly/src/wheel.wav");


sidebarToggle.addEventListener('click', function() {
  sidebar.classList.toggle('open');
  main.classList.toggle('open');
  if (sidebar.classList.contains('open')) {
    sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
    sidebar.style.flex = '4';
    main.style.flex = '6';
  } else {
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    sidebar.style.flex = '0';
    main.style.flex = '10';
    sidebar.classList.add('closed');
    setTimeout(function() {
      sidebar.classList.remove('closed');
    }, 500);
  }
});


function letsSpin() {

    var x = 1024; //min value
    var y = 9999; //max value

    var deg = Math.floor(Math.random() * (x - y)) + y;

    document.getElementById('wheel').style.transform = "rotate("+deg+"deg)";
    audio.play();
}
