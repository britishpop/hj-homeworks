const piano = document.getElementsByClassName("set")[0];
const currentSet = piano.classList[1];
const keys = piano.getElementsByTagName("li");
const audio = piano.getElementsByTagName("audio");

const srcListHigher = [
  "sounds/higher/first.mp3",
  "sounds/higher/second.mp3",
  "sounds/higher/third.mp3",
  "sounds/higher/fourth.mp3",
  "sounds/higher/fifth.mp3"
];

const srcListLower = [
  "sounds/lower/first.mp3",
  "sounds/lower/second.mp3",
  "sounds/lower/third.mp3",
  "sounds/lower/fourth.mp3",
  "sounds/lower/fifth.mp3"
];

const srcListMiddle = [
  "sounds/middle/first.mp3",
  "sounds/middle/second.mp3",
  "sounds/middle/third.mp3",
  "sounds/middle/fourth.mp3",
  "sounds/middle/fifth.mp3"
];


for (let i = 0; i < audio.length; i++) {
  audio[i].src = srcListMiddle[i];
}

function changeSet (newSet) {
  debugger;
  piano.classList.add(newSet);
  switch (newSet) {
    case "lower":
      piano.classList.remove("middle", "higher");
      for (let i = 0; i < audio.length; i++) {
        audio[i].src = srcListLower[i];
      }
      break;
    case "higher":
      piano.classList.remove("middle", "lower");
      for (let i = 0; i < audio.length; i++) {
        audio[i].src = srcListHigher[i];
      }
      break;
  }
}

function clearSet () {
  piano.classList.remove("higher", "lower");
  piano.classList.add("middle");
  for (let i = 0; i < audio.length; i++) {
    audio[i].src = srcListMiddle[i];
  }
}

function audioPlay (ev) {
  ev.currentTarget.getElementsByTagName('audio')[0].play();
}

function pianoPlay (ev) {
  if (ev.repeat) {
    return;
  }
  if (ev.shiftKey) {
    changeSet("lower");
  } else if (ev.altKey) {
    changeSet("higher");
  }
}


document.addEventListener("keydown", pianoPlay);
document.addEventListener("keyup", clearSet);

for (let key of keys) {
  key.addEventListener("click", audioPlay)
}
