const mediaplayer = document.getElementsByClassName("mediaplayer")[0];
const backwardButton = document.getElementsByClassName("back")[0];
const forwardButton = document.getElementsByClassName("next")[0];
const playStateButton = document.getElementsByClassName("playstate")[0];
const stopButton = document.getElementsByClassName("stop")[0];
const audio = document
              .getElementsByClassName("mediaplayer")[0]
              .getElementsByTagName("audio")[0];
const songInfo = mediaplayer.querySelector("span.title");


const songs = {
  "LA Chill Tour": "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Chill Tour.mp3",
  "This is it band": "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This is it band.mp3",
  "LA Fusion Jam":"https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Fusion Jam.mp3"
}

const playlist = ["LA Chill Tour", "This is it band", "LA Fusion Jam"]

let songIndex = 0;

function backward () {
  playback();
  (songIndex === 0 ? songIndex = playlist.length - 1: songIndex--);
  audio.src = songs[playlist[songIndex]];
  songInfo.title = playlist[songIndex];
  playback();
}

function forward () {
  playback();
  (songIndex === playlist.length - 1 ? songIndex = 0 : songIndex++);
  audio.src = songs[playlist[songIndex]];
  songInfo.title = playlist[songIndex];
  playback();
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

backwardButton.addEventListener("click", backward);
forwardButton.addEventListener("click", forward);
playStateButton.addEventListener("click", playback);
stopButton.addEventListener("click", stop);
