const pics = [
  "i/airmax-jump.png",
  "i/airmax-on-foot.png",
  "i/airmax-playground.png",
  "i/airmax-top-view.png",
  "i/airmax.png"
];
const slider = document.getElementById("slider");
slider.src = pics[0];

const spin = function (arr) {
  let i = 0;
  setInterval(() => {
    slider.src = pics[i];
    i === 4 ? i = 0 : i ++;
  }, 5000);
};

spin(pics);
