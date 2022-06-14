const breakpoint = 1024;
const toggle = document.getElementById('btn-mobile');
const overlayDiv = document.getElementById('overlay');
const nav = document.getElementById('navbar');
const body = document.getElementsByTagName('body')[0];

// FUNÇÃO PARA FECHAR O MENU //
function closeMenu() {
  nav.classList.remove('active');
  overlayDiv.style.visibility = 'hidden';
  body.style.overflow = 'visible';
}

toggle.addEventListener('click', function (e) {
  if (nav.classList.contains('active')) {
    closeMenu();
  }

  else {
    overlayDiv.style.visibility = 'visible';
    nav.classList.add('active');
    body.style.overflow = 'hidden';
    e.currentTarget.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
  }
});


window.addEventListener('click', function (e) {
  !nav.contains(e.target) && this.window.innerWidth < breakpoint && nav.classList.contains("active") && closeMenu();
});


// SLIDER

const slider = document.getElementById('container');
const carrosselLeft = document.getElementById('icon-left');
const carrosselRight = document.getElementById('icon-right');

carrosselRight.addEventListener('click', (e) => {
  sliderChange(true)
});

carrosselLeft.addEventListener('click', (e) => {
  sliderChange(false)
});

var atual = 0;
// childElementCount

function sliderChange(moveRight) {

  
  if (moveRight == true) {

    atual++;

    if (atual < slider.childElementCount) {
      slider.style.transform = "translate(-" + (atual * 100) +"%)";
    }
    else {
      slider.style.transform = "translate(0%)";
      atual = 0;
    }
  }
  
  else {
    atual -= 1;

    if (atual >= 0) {
      slider.style.transform = "translate(-" + (atual * 100) +"%)";
    }
    else {
      atual = slider.childElementCount - 1;
      slider.style.transform = "translate(-" + (atual * 100) +"%)";
    }
  }
}

// carrossel_button.forEach((element, i) => {
//   element.addEventListener('click', (e) => {
//     slider.style.transform = 'translate(-' + (i * slider_transform) + '%)';

//     carrossel_button.forEach(removeclass => {
//       removeclass.children[0].classList.remove('active');
//     });

//     element.children[0].classList.add('active');
//   });
// });


function scrollValue() {
  var navbar = document.getElementById('navbar');
  var scroll = window.scrollY;
  if (scroll < 200) {
      navbar.style.background = '#000e1a';
  } else {
      navbar.style.background = '#00192e';
  }
}

window.addEventListener('scroll', scrollValue);