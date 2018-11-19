'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'),
      messageInput = document.querySelector('.message-input'),
      submitButton = document.querySelector('.message-submit'),
      content = document.querySelector('.messages-content'),
      chatStatus = document.querySelector('.chat-status');


submitButton.addEventListener('click', onSubmit);
messageInput.addEventListener('keydown', onSubmit);
connection.addEventListener('open', onOpen);
connection.addEventListener('message', onMessage);
connection.addEventListener('error', (error) => console.log(error));
connection.addEventListener('close', onClose);

function onOpen(event) {
  const markup = getHTML('status'),
        messageText = markup.querySelector('.message-text');
  messageText.innerText = 'Пользователь появился в сети';
  content.appendChild(markup);
  chatStatus.innerText = chatStatus.dataset.online;
  submitButton.disabled = false;
}

function onSubmit(event) {
  if (verifySender(event)) {
    event.preventDefault();
    connection.send(messageInput.value);
    const markup = getHTML('message-personal'),
          messageText = markup.querySelector('.message-text'),
          timeStamp = markup.querySelector('.timestamp');
    messageText.innerText = messageInput.value;
    timeStamp.innerText = getTimeStamp();
    content.appendChild(markup);
    messageInput.value = '';
  }
}

function onMessage(event) {
  if (content.lastChild.classList.contains('loading')) {
    content.removeChild(content.lastChild);
  }
  if (event.data === '...') {
    const markup = getHTML('loading');
    content.appendChild(markup);
    return;
  }
  const markup = getHTML('message'),
        messageText = markup.querySelector('.message-text'),
        timeStamp = markup.querySelector('.timestamp');
  messageText.innerText = event.data;
  timeStamp.innerText = getTimeStamp();
  content.appendChild(markup);
}

function onClose(event) {
  const markup = getHTML('status'),
        messageText = markup.querySelector('.message-text');
  messageText.innerText = 'Пользователь не в сети';
  content.appendChild(markup);
  chatStatus.innerText = chatStatus.dataset.offline;
  submitButton.disabled = true;
}

function getHTML(type) {
  const templates = Array.from(document.querySelector('.messages-templates').children);
  if (type === 'message') {
    const markup = templates.find(el => el.classList.length === 1).cloneNode(true);
    return markup;
  }
  if (type === 'message-personal') {
    const markup = templates.find(el => el.classList.contains('message-personal')).cloneNode(true);
    return markup;
  }
  if (type === 'loading') {
    const markup = templates.find(el => el.classList.contains('loading')).cloneNode(true);
    return markup;
  }
  if (type === 'status') {
    const markup = templates.find(el => el.classList.contains('message-status')).cloneNode(true);
    return markup;
  }
}

function getTimeStamp() {
  const currentDate = new Date,
        currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`
  return currentTime;
}

function verifySender(event) {
  if (event.target.tagName === 'BUTTON' || event.key === 'Enter') {
    return true;
  }
}
