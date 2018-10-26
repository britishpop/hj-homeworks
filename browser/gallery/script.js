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

function galleryNext () {
  (i === picList.length - 1 ? i = 0 : i++);
  currentPic.src = picList[i];
}

function galleryPrev () {
  (i === 0 ? i = picList.length - 1: i--);
  currentPic.src = picList[i];
}

nextBut.onclick = galleryNext;
prevBut.onclick = galleryPrev;
