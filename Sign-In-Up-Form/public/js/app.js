// select elements

let signinBtn = document.querySelector('#signin-btn'),
signupBtn = document.querySelector('#signup-btn'),
container = document.querySelector('.container');

//add class signin-animate
signupBtn.addEventListener('click', ()=>{
  container.classList.add('signin-animate')
})

//remove class signin-animate
signinBtn.addEventListener('click', ()=>{
  container.classList.remove('signin-animate')
})
