var h2 = document.querySelector("h2");
const colorSetting = document.getElementById("colorSetting");
const color = localStorage.getItem("val");
const defaultColor = '#ffffff';
 
 
const input = document.createElement('input');
input.type = 'color';
input.id = 'setColor';
input.className = 'color-input';
input.setAttribute('onchange' , 'show()'); 
input.value = color;
colorSetting.appendChild(input);

function save(){
var l = document.getElementById("setColor").value;
localStorage.setItem("val",l);

h2.innerHTML = localStorage.getItem("val");
}


function show(){
var l = document.getElementById("setColor").value;
h2.innerHTML = l;
container.style.backgroundColor = l;
}
function resetColor(){
 localStorage.setItem("val" , defaultColor);
 container.style.backgroundColor = defaultColor;
 h2.innerHTML = 'Default';
 input.value = defaultColor;
}


if (color == defaultColor) {
    container.style.backgroundColor = defaultColor;
    h2.innerHTML= 'Default';
}
else{  
 container.style.backgroundColor = color;
 h2.innerHTML = localStorage.getItem("val");
}


//div showing/hiding

function handleNavClick(hash) {
  const currentHash = window.location.hash.substring(1);

  // Do nothing if the hash is the same as the current hash
  if (hash === currentHash) {
    return;
  }

  // Hide all divs
  const divs = document.querySelectorAll('#files-auth > div');
  divs.forEach(div => div.style.display = 'none');

  // Show the selected div
  const activeDiv = document.getElementById(hash);
  if (activeDiv) {
    activeDiv.style.display = 'block';
  }

  // Update the hash without reloading the page
  window.history.pushState(null, null, `#${hash}`);
}

// Call the function on page load to display the correct div
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    handleNavClick(hash);
  }
});

// Handle back/forward navigation
window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1);
  handleNavClick(hash);
});



let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
const hamburger = document.getElementById('hamburger');
var home = document.getElementById('homepage');

btn.onclick = function() {
  sidebar.classList.toggle("active");
     
  if(sidebar.classList.contains("hide")){
    sidebar.classList.replace("hide" , "show");
    sidebar.style.display="block";
  
  }else{
    sidebar.classList.replace("show" , "hide");

  }

  hamburger.classList.toggle('cross');
  
}

//home.click(); //open home by default