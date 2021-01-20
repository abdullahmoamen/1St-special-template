let imgArr=['3.jpg','1.jpg','2.jpg','5.jpg','6.jpg','7.jpg'];
let landingPage=document.querySelector('.landing-page');
let toggleSetting=document.querySelector('.toggle-setting .fa-cog');
let settingBox =  document.querySelector('.setting-box');
let colorList=document.querySelectorAll('.colors-list li');
let randomBackgcolor=document.querySelectorAll('.random-background span');
let mainColor=localStorage.getItem('color-option');
// control interval
let bckgInterval;
let backgroundOption=true;
//skills 
let ourSkills =document.querySelector('.skills');

//create pop up gallaries
let ourGallary =document.querySelectorAll('.gallary img');


// check / background item in local storage
let bcgLocalItem=localStorage.getItem('background-option');
// check if random bcg local storage not empty
if(bcgLocalItem !== null){
    if(bcgLocalItem === 'true'){
        document.querySelector('.random-background .yes').classList.add('active');
    }else{
        document.querySelector('.random-background .no').classList.add('active');
    }
    //remove active class
    document.querySelectorAll('.random-background span').forEach(element =>{
        element.classList.remove('active')
    });

}
// check local storage color
if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color',mainColor)
    // remove active class
    document.querySelectorAll('.colors-list li').forEach(element =>{
        element.classList.remove('active');

        //  li  هنضيف ال اكتيف كلاس لل المناسب
        if(element.dataset.color=== mainColor){
            element.classList.add('active')
        }
    });
}

//switch colors,
//loop in each li
colorList.forEach(li =>{
    //click on every li
    li.addEventListener('click',(e)=>{
        let colorTarget=e.target.dataset.color;
        //set color 
        document.documentElement.style.setProperty('--main-color',colorTarget)
        //set color in root
        localStorage.setItem('color-option',colorTarget)
        handleActive(e)
    })
})

//switch colors,
//loop in each li
randomBackgcolor.forEach(span =>{
    //click on every li
    span.addEventListener('click',(e)=>{
        handleActive(e);
        
    if(e.target.dataset.background === 'yes'){
        backgroundOption=true;
        randomImg();
        localStorage.setItem('background-option',true)

    }else{
        backgroundOption=false;
        clearInterval(bckgInterval);
        localStorage.setItem('background-option',false)
    }
    })
})

//option toggles
toggleSetting.addEventListener('click',()=>{
    toggleSetting.classList.toggle('fa-spin');
    settingBox.classList.toggle('show');
})

// function random back-ground
function randomImg(){
if(backgroundOption === true){
// set time to convert photos
bckgInterval=setInterval(() =>{
    let randNum=Math.floor(Math.random() * imgArr.length);
    landingPage.style.backgroundImage='url("images/'+ imgArr[randNum]+'")'
    },5000)
}}

//skills selector

window.onscroll=()=>{
    //offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    //outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    //window height
    let windowHeight =this.innerHeight;
    //window scroll top
    let windowScrollTop =this.pageYOffset;

    if(windowScrollTop < (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span')
        allSkills.forEach(skill=>{
            skill.style.width=skill.dataset.progress;
        })
    }
}


//create pop up gallaries
    ourGallary.forEach(img=>{
    img.addEventListener('click',(e)=>{
        //crete div
        let overlay=document.createElement('div');
        //create class
        overlay.className='popup-overlay';
        //append class to body
        document.body.appendChild(overlay);

        // create pop up
        let popupBox=document.createElement('div');
        //add class to popupBox
        popupBox.className='popup-box'
        
        //add heading,alt txt to popup box
        if(img.alt !==null){
            let imgHeading = document.createElement('h3');
            let imgTxt=document.createTextNode(img.alt);
            //appending
                imgHeading.appendChild(imgTxt);
            // append to popup box
                popupBox.appendChild(imgHeading);
            }

        //create img
        let popupImg=document.createElement('img')
        //set img src
        popupImg.src=img.src;

        //add img to popup box
        popupBox.appendChild(popupImg);

        //append the popupBox to body
        document.body.appendChild(popupBox);
            // create close btn
        let closeBtn=document.createElement('span');
            // create span text
        let closeBtnTxt=document.createTextNode('X');
            // add class to close btn
        closeBtn.className='close-btn';
            //append text to span
        closeBtn.appendChild(closeBtnTxt);
            // append close btn to popup box
        popupBox.appendChild(closeBtn);

    })
})
//close popup
document.addEventListener('click',(e)=>{
    if(e.target.className== 'close-btn'){
        e.target.parentNode.remove();
    let popupOverlay= document.querySelector('.popup-overlay');
        popupOverlay.remove();
    }
})



//select all bullets
const allBtns = document.querySelectorAll('.nav-bullets .bullet');
const allLinks = document.querySelectorAll('.links a');

function scrolling(elements){
elements.forEach(ele=>{
    ele.addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})
}
scrolling(allBtns);
scrolling(allLinks);

// handle Active State
function handleActive(ev){
     // remove active class
    let removeActiveClass= ev.target.parentElement.querySelectorAll('.active');
    removeActiveClass.forEach(element =>{
    element.classList.remove('active');
    });
    ev.target.classList.add('active');
}
// bullets option 
let bulletSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets')
let bulletLocal=localStorage.getItem('bullets-option');

if(bulletLocal !== null){
    bulletSpan.forEach(span => {
        span.classList.remove('active')
    });
    if(bulletLocal==='block'){
        bulletsContainer.style.display = 'block'
        document.querySelector('.bullets-option .yes').classList.add('active')
    }else{
        bulletsContainer.style.display = 'none'
        document.querySelector('.bullets-option .no').classList.add('active')

    }

}

bulletSpan.forEach(span => {
    span.addEventListener('click',(e) => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display='block';
            localStorage.setItem('bullets-option','block');
        }
        else{
            bulletsContainer.style.display='none';
            localStorage.setItem('bullets-option','none');
        };
        handleActive(e);
    })
})
//reset setting
document.querySelector('.reset-option').onclick = function(){
    //localStorage.clear();
    localStorage.removeItem('bullets-option');
    localStorage.removeItem('color-option');   
    localStorage.removeItem('background-option');
    window.location.reload();
}
// prevent defualt on submit button
let sub=document.getElementById('sub');
sub.addEventListener('click',(e) =>{
    e.preventDefault()
})
//toggle menu
let toggleBtn=document.querySelector('.toggle-menu');
let tlinks=document.querySelector('.links');

toggleBtn.onclick=function(e){
    e.stopPropagation();

                // toggle السهم
    toggleBtn.classList.toggle('menu-active')
                // menu toggle
    tlinks.classList.toggle('open')
}
                // click outside menu to close it
document.addEventListener('click',(e)=>{
    if(e.target !== toggleBtn && e.target !== tlinks){
                // check if the menu is open or not
        if(tlinks.classList.contains('open')){
                // toggle السهم
    toggleBtn.classList.toggle('menu-active');
                // menu toggle
    tlinks.classList.toggle('open')
        }
    }
})

// stop propagation in menu

tlinks.onclick=function(e){
    e.stopPropagation();
}


 // dark mode
// const toggle = document.querySelector('.toggle')
// toggle.addEventListener('click', (e) => {
//     const html = document.querySelector('html')
//     if (html.classList.contains('dark')) {
//         html.classList.remove('dark')
//         e.target.innerHTML = 'Dark mode'
//     } else {
//         html.classList.add('dark')
//         e.target.innerHTML = 'Light mode'
//     }
// })

const introTxt =document.querySelector('.web-designers');
const text='We Are Web Designers...';
let inx=1;

writeText()

function writeText() {
    introTxt.innerText=text.slice(0,inx);
    inx++;
    if(inx>text.length){
        inx=1;
    }
    setTimeout(writeText,100)
}