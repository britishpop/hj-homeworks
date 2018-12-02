'use strict';

const wss = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const wssTags = Array.from(document.querySelectorAll('.websocket div'));

wss.addEventListener('message', onWssMessage);


function onWssMessage(e) {
  changeActive(wssTags, e.data);
}
