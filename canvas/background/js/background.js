'use strict';

const canvas = document.querySelector('#wall');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [];
const crosses = [];

function init() {
  const count = Math.round(getRandom(25, 100));
  for (let i = 0; i < count; i++) {
    const size = getRandom(0.1, 0.6);

    circles.push({
      x0: Math.random() * canvas.width,
      y0: Math.random() * canvas.height,
      size: size,
      nextPointFunc: Math.random() > 0.5 ? timeVar1 : timeVar2
    });

    crosses.push({
      x0: Math.random() * canvas.width,
      y0: Math.random() * canvas.height,
      size: size,
      nextPointFunc: Math.random() > 0.5 ? timeVar1 : timeVar2,
      angle: Math.round(getRandom(0, 360)) * Math.PI / 180,
      speed: getRandom(-0.2, 0.2)
    });
  }

  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(drawCircle);
  crosses.forEach(drawCross);

  requestAnimationFrame(animate);
}

function drawCircle(circle) {
  const {x0, y0, size, nextPointFunc} = circle;
  const {x, y} = nextPointFunc(x0, y0, Date.now());

  ctx.beginPath();
  ctx.lineWidth = size * 5;
  ctx.strokeStyle = 'white';
  ctx.arc(x, y, size * 12, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.stroke();
}

function drawCross(cross) {
  const {x0, y0, size, nextPointFunc, speed} = cross;
  const {x, y} = nextPointFunc(x0, y0, Date.now());

  const crossSide = size * 20;

  cross.angle += speed;

  const rotateAboutX = x + crossSide / 2;
  const rotateAboutY = y + crossSide / 2;

  ctx.save();
  ctx.translate(rotateAboutX, rotateAboutY);
  ctx.rotate(cross.angle);
  ctx.translate(-rotateAboutX, -rotateAboutY);

  ctx.beginPath();
  ctx.lineWidth = size * 5;
  ctx.strokeStyle = 'white';
  ctx.moveTo(x, y);
  ctx.lineTo(x + crossSide, y + crossSide);
  ctx.moveTo(x + crossSide, y);
  ctx.lineTo(x, y + crossSide);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

function timeVar1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

function timeVar2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

init();
