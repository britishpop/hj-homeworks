'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let thickness = 100;
let thicknessDirection = -1;
let hue = 0;

window.addEventListener('resize', onResize);
canvas.addEventListener('mousemove', onMouseMove);

function hueChange(event) {
  if (event.shiftKey) {
    hue == 0 ? hue = 359 : hue--;
  } else {
    hue == 359 ? hue = 0 : hue++;
  }
}


function thicknessChange() {
  thickness += thicknessDirection;
  if (thickness == 0 || thickness == 100) {
    thicknessDirection = -thicknessDirection;
  }
}


function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function onMouseMove(event) {
  if (event.which != 1) {
    return;
  } else {
    ctx.beginPath();
    hueChange(event);
    thicknessChange();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = thickness;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.moveTo(event.clientX, event.clientY);
    ctx.lineTo(event.clientX, event.clientY);
    ctx.closePath();
    ctx.stroke();
  }
}
