const homePageCartNumSpan = document.getElementById('cartNumSpan');
if (homePageCartNumSpan) {
  const totalCartCount = calculateTotalCartCount();
  homePageCartNumSpan.innerText = totalCartCount.toString();
}

function calculateTotalCartCount() {
  let totalCartCount = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('cart_')) {
      const count = parseInt(localStorage.getItem(key), 10) || 0; 
      totalCartCount += count;
    }
  }

  return totalCartCount;
}

document.addEventListener('DOMContentLoaded', function () {
    var userEmail = localStorage.getItem('userEmail') || '';
    var userEmailElement = document.getElementById('userEmail');
    userEmailElement.innerText = userEmail;
  
    var loginBtn = document.getElementById('loginBtn');
  
    if (loginBtn) {
      if (userEmail) {
        loginBtn.style.display = 'none';
  
        var logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('products');
            localStorage.removeItem('cart');
            window.location.href = '../LoginPage/login.html';
          });
        }
      } else {
        loginBtn.addEventListener('click', function () {
          window.location.href = '../LoginPage/login.html';
        });
      }
    }
  });
  
window.addEventListener('beforeunload', function () {
    localStorage.removeItem('products');
    localStorage.removeItem('cart');
  });

// Start of Slider

var i = 1;

var slide = document.getElementById('slide');

var timer;

function left()
{
    i--;

    if(i<=0){
        i=3;
    }
    
    updateSlide();
}

function right()
{
    i++;
    if(i>3){
        i=1;
    }

    updateSlide();
}

function play()
{
    timer = setInterval(right,4000);
}

function pause()
{
    clearInterval(timer);
}

function updateSlide() {
    slide.className = 'c' + i;
    console.log(i);
}

document.addEventListener('DOMContentLoaded', function () {
  play();
});

// End of Slider


// Start of Deal 

let countDate = new Date('april, 2024 00:00:00').getTime();

function countDown(){
    let now = new Date().getTime();
    gap = countDate - now;


    let seconds = 1000;
    let minutes = seconds * 60;
    let hours = minutes * 60;
    let day = hours * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hours));
    let m = Math.floor((gap % (hours)) / (minutes));
    let s = Math.floor((gap % (minutes)) / (seconds));

    document.getElementById('days').innerText = d;
    document.getElementById('hours').innerText = h;
    document.getElementById('minutes').innerText = m;
    document.getElementById('seconds').innerText = s;
}

setInterval(function(){
    countDown()
},1000);


// End of Deal


// Start of Review Section

var swiper = new Swiper(".review-slider",{
    slidesPerView:3,
    loop:true,
    spaceBetween: 30,
    autoplay:{
        delay: 4000,
        disableOnInteraction: false,
    },
});



// End of Review Section
