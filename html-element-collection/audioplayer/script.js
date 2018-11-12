const mediaplayer = document.getElementsByClassName("mediaplayer")[0];
const backwardButton = document.getElementsByClassName("back")[0];
const forwardButton = document.getElementsByClassName("next")[0];
const playStateButton = document.getElementsByClassName("playstate")[0];
const stopButton = document.getElementsByClassName("stop")[0];
const audio = document
              .getElementsByClassName("mediaplayer")[0]
              .getElementsByTagName("audio")[0];
const songInfo = mediaplayer.querySelector("span.title");

const playlist = [
  {
    title: "LA Chill Tour",
    src: "mp3/LA Chill Tour.mp3"
  },
  {
    title: "This is it band",
    src: "mp3/This is it band.mp3",
  },
  {
    title: "LA Fusion Jam",
    src: "mp3/LA Fusion Jam.mp3"
  }
]

let songIndex = 0;

function backward () {
  songIndex === 0 ? songIndex = playlist.length - 1: songIndex--;
  audio.src = playlist[songIndex].src;
  songInfo.title = playlist[songIndex].title;
  if (mediaplayer.classList.contains("play")) {
    play();
  }
}

function forward () {
  songIndex === playlist.length - 1 ? songIndex = 0 : songIndex++;
  audio.src = playlist[songIndex].src;
  songInfo.title = playlist[songIndex].title;
  if (mediaplayer.classList.contains("play")) {
    play();
  }
}

function playback () {
  audio.paused ? play() : pause();
}

function play () {
  audio.play();
  mediaplayer.classList.add("play");
}

function pause () {
  audio.pause();
  mediaplayer.classList.remove("play");
}

function stop () {
  pause();
  audio.currentTime = 0;
}

backwardButton.addEventListener("click", backward);
forwardButton.addEventListener("click", forward);
playStateButton.addEventListener("click", playback);
stopButton.addEventListener("click", stop);
