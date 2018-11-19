'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

document.addEventListener('click', clickHandler);
// connection.addEventListener('message', (event) => console.log(event));
// connection.addEventListener('error', (event) => console.log(event));

function clickHandler(event) {
  const currentClick = {
        'x': event.clientX,
        'y': event.clientY
      };
  connection.send(JSON.stringify(currentClick));
}

showBubbles(connection);
