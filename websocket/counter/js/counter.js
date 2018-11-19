'use strict';

const connectionCounter = document.querySelector('.counter'),
      errorCounter = document.querySelector('output.errors'),
      connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', parseMessage);
// connection.addEventListener('error', (error) => console.log(error));
document.addEventListener('beforeunload', () => connection.close(1000));

function parseMessage(event) {
  const data = JSON.parse(event.data);
  connectionCounter.innerText = data.connections;
  errorCounter.innerText = data.errors;
}
