/* =========================================
   AAYUSH SHRESTHA PORTFOLIO

   MAIN.JS

   ANIMATIONS + INTERACTIONS

========================================= */



// ========================================
// TYPING EFFECT
// ========================================


const words = [

"Frontend Developer",

"Web Designer",

"JavaScript Learner",

"BCA Student"

];



let wordIndex = 0;

let charIndex = 0;

let deleting = false;



const typingText =
document.querySelector(".hero h2");





function typingAnimation(){


let current =
words[wordIndex];



if(!deleting){


typingText.innerHTML =

current.substring(
0,
charIndex++
)
+
"<br>";


if(charIndex > current.length){

deleting=true;


setTimeout(
typingAnimation,
1000
);


return;

}



}
else{


typingText.innerHTML =

current.substring(
0,
charIndex--
)
+
"<br>";



if(charIndex===0){


deleting=false;


wordIndex++;



if(wordIndex>=words.length){

wordIndex=0;

}


}



}



setTimeout(

typingAnimation,

deleting ? 40 : 100

);


}



typingAnimation();









// ========================================
// SCROLL REVEAL
// ========================================


const revealElements =

document.querySelectorAll(

"section, .skill-card, .project-card, .about-box"

);



function revealOnScroll(){



revealElements.forEach(

element=>{


let position =

element.getBoundingClientRect()
.top;



let screenHeight =

window.innerHeight;



if(position < screenHeight-100){



element.classList.add(
"show"
);



}



}

);



}



window.addEventListener(

"scroll",

revealOnScroll

);



revealOnScroll();









// ========================================
// MOUSE LIGHT EFFECT
// ========================================



const glow =
document.createElement(
"div"
);



glow.className =
"mouse-glow";



document.body.appendChild(
glow
);





document.addEventListener(

"mousemove",

(e)=>{


glow.style.left =
e.clientX+"px";


glow.style.top =
e.clientY+"px";


}

);









// ========================================
// NAVBAR CHANGE ON SCROLL
// ========================================


const header =
document.querySelector(
"header"
);



window.addEventListener(

"scroll",

()=>{


if(window.scrollY>50){


header.style.background=

"rgba(0,0,0,.85)";


}

else{


header.style.background=

"rgba(5,5,5,.55)";


}



}

);









// ========================================
// PROJECT CARD TILT EFFECT
// ========================================


const cards =
document.querySelectorAll(

".project-card, .skill-card"

);




cards.forEach(

card=>{


card.addEventListener(

"mousemove",

(e)=>{


const rect =
card.getBoundingClientRect();



const x =
e.clientX -
rect.left;



const y =
e.clientY -
rect.top;



const rotateX =

(y - rect.height/2)/15;



const rotateY =

(rect.width/2-x)/15;



card.style.transform =

`
perspective(800px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.05)
`;



}



);





card.addEventListener(

"mouseleave",

()=>{


card.style.transform="";


}



);



}

);









// ========================================
// ACTIVE LINK
// ========================================



const sections =
document.querySelectorAll(
"section"
);



const navLinks =
document.querySelectorAll(
"nav a"
);



window.addEventListener(

"scroll",

()=>{


let current="";



sections.forEach(

section=>{


const sectionTop =
section.offsetTop-200;



if(
scrollY>=sectionTop
){

current=
section.id;

}



}



);



navLinks.forEach(

link=>{


link.style.color="";



if(

link.href.includes(current)

){


link.style.color=
"#00e5ff";


}



}



);



}

);









// ========================================
// ADD CSS ANIMATION CLASSES
// ========================================



const style =
document.createElement(
"style"
);



style.innerHTML = `



section,
.skill-card,
.project-card,
.about-box{

opacity:0;

transform:
translateY(50px);

transition:
1s ease;

}



.show{

opacity:1;

transform:
translateY(0);

}



.mouse-glow{

position:fixed;

width:250px;

height:250px;

border-radius:50%;

pointer-events:none;

background:

radial-gradient(

circle,

rgba(0,229,255,.15),

transparent 70%

);


transform:
translate(-50%,-50%);

z-index:-1;

}



`;



document.head.appendChild(
style
);









// ========================================
// PAGE LOAD ANIMATION
// ========================================


window.addEventListener(

"load",

()=>{


document.body.style.opacity="1";


}

);
