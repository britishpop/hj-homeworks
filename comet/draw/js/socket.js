'use strict';

const wss = new WebSocket('wss://neto-api.herokuapp.com/draw');

editor.addEventListener('update', sendCanvas);

function sendCanvas(e) {
  e.canvas.toBlob(blob => wss.send(blob));
}
