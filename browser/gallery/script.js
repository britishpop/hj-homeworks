const currentPic = document.getElementById("currentPhoto");
const nextBut = document.getElementById("nextPhoto");
const prevBut = document.getElementById("prevPhoto");

const picList = [
  "i/breuer-building.jpg",
  "i/guggenheim-museum.jpg",
  "i/headquarters.jpg",
  "i/IAC.jpg",
  "i/new-museum.jpg"
];

let i = 0;
currentPic.src = picList[i];

function gallery () {
  if (i === picList.length || i === -picList.length) {
    i = 0;
    currentPic.src = picList[i];
    return;
  }
  if (this.id === "nextPhoto") {
    currentPic.src = picList[++i];
  } else if (this.id === "prevPhoto") {
    currentPic.src = picList[--i];
  }
}

nextBut.onclick = gallery;
prevBut.onclick = gallery;
