const mediaplayer = document.getElementsByClassName("mediaplayer")[0];
const backwardButton = document.getElementsByClassName("back")[0];
const forwardButton = document.getElementsByClassName("next")[0];
const playStateButton = document.getElementsByClassName("playstate")[0];
const stopButton = document.getElementsByClassName("stop")[0];
const audio = document
              .getElementsByClassName("mediaplayer")[0]
              .getElementsByTagName("audio")[0];

function backward () {
  audio.currentTime -= 10;
}

function forward () {
  audio.currentTime += 10;
}

function playback () {
  audio.paused ? play() : pause();
}

function play () {
  audio.play();
  mediaplayer.classList.toggle("play");
}

function pause () {
  audio.pause();
  mediaplayer.classList.toggle("play");
}

function stop () {
  audio.pause();
  mediaplayer.classList.remove("play");
  audio.currentTime = 0;
}

backwardButton.onclick = backward;
forwardButton.onclick = forward;
playStateButton.onclick = playback;
stopButton.onclick = stop;
