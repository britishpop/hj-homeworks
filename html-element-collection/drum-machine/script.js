function play (event) {
  pauseAll();
  const drum = document.getElementsByClassName(event.currentTarget.classList[1]);
  drum[0].querySelector("audio").play();
}

function pauseAll () {
  const sources = document.getElementsByTagName("audio");
  for (let source of sources) {
    source.pause();
    source.currentTime = 0;
  }
}

const drums = document.getElementsByClassName("drum-kit__drum");

for (let drum of drums) {
  drum.addEventListener("click", play);
}
