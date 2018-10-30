let codeInput = "";
const navBar = document.querySelector("nav");
const easterEgg = document.querySelector(".secret")

function showEasterEgg () {
  easterEgg.classList.toggle("visible");
}

function textInput (event) {
  switch (event.code) {
    case "KeyY":
      codeInput = codeInput.concat("н");
      break;
    case "KeyT":
      codeInput = codeInput.concat("е");
      break;
    case "KeyN":
      codeInput = codeInput.concat("т");
      break;
    case "KeyJ":
      codeInput = codeInput.concat("о");
      break;
    case "KeyK":
      codeInput = codeInput.concat("л");
      break;
    case "KeyU":
      codeInput = codeInput.concat("г");
      break;
    case "KeyB":
      codeInput = codeInput.concat("и");
      break;
    case "KeyZ":
      codeInput = codeInput.concat("я");
      break;
  }
  if (codeInput.lastIndexOf("нетология") !== -1) {
    showEasterEgg();
  }
}

function controlsInput (event) {
  if (event.ctrlKey && event.altKey && event.code === "KeyT") {
    navBar.classList.toggle("visible");
  }
}

document.addEventListener("keydown", textInput);
document.addEventListener("keydown", controlsInput);
