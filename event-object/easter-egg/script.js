const navBar = document.querySelector("nav");
const easterEgg = document.querySelector(".secret");
const secretWord = "KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ";
let codeInput = "";

function showEasterEgg () {
  easterEgg.classList.toggle("visible");
}

function textInput (event) {
  codeInput += event.code;
  if (codeInput.lastIndexOf(secretWord) !== -1) {
    showEasterEgg();
    codeInput = "";
  }
}

function controlsInput (event) {
  if (event.ctrlKey && event.altKey && event.code === "KeyT") {
    navBar.classList.toggle("visible");
  }
}

document.addEventListener("keydown", textInput);
document.addEventListener("keydown", controlsInput);
