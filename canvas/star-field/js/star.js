'use strict';

const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

canvas.addEventListener('click', generateSky);
document.addEventListener('DOMContentLoaded', () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
})

function generateSky() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const totalStars = Math.floor(getRandom(200, 401));
  for (let i = 0; i <= totalStars; i++) {
    drawStar();
  }
}

function drawStar() {
  ctx.fillStyle = colors[Math.round(getRandom(0, 3))];
  ctx.globalAlpha = getRandom(0.8, 1);
  ctx.beginPath();
  const x = getRandom(0, canvas.width),
        y = getRandom(0, canvas.height),
        radius = getRandom(0, 1.1),
        startAngle = 0,
        endAngle = Math.PI * 2;
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
