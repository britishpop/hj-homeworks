'use strict';

const forms = document.getElementsByTagName('form');
let outputMessage, outputMessageVariable;

function setHandlers() {
  for (let form of forms) {
    form.addEventListener('click', (event) => {
      if (event.target.classList.contains('button')) {
        event.preventDefault();
        sendForm(event.currentTarget);
      }
    })
  }
}

function gatherData(form) {
  const formData = new FormData(form);
  const requestObj = {};
  for (let [k, v] of formData) {
    requestObj[k] = v;
  }
  return JSON.stringify(requestObj);
}

function sendForm(form) {
  outputMessage = form.querySelector(".error-message");
  const destination = getDestination(form);
  const requestData = gatherData(form);

  // ------ xhr version ------
  const xhr = new XMLHttpRequest;
  xhr.open('POST', destination);
  xhr.addEventListener('load', () => responseHandler(xhr.response));
  xhr.addEventListener('error', () => console.log(xhr.error));
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(requestData);


  // ------ fetch version ------
  // const request = fetch(destination, {
  //                   body: requestData,
  //                   credentials : 'same-origin',
  //                   method: 'POST',
  //                   headers: {
  //                     'Content-Type': 'application/json'
  //                   },
  //                 })
  //                 .then(response => responseHandler(response))
  //                 .catch((err) => {
  //                   console.log(err)
  //                 })
}

function responseHandler(response) {
  debugger;
  const parsedResponse = JSON.parse(response);
  debugger;
  if (parsedResponse.error) {
    outputMessage.innerText = parsedResponse.message;
  } else {
    outputMessage.innerText = `Пользователь ${parsedResponse.name} успешно ${outputMessageVariable}`;
  }
}

function getDestination(form) {
  if (form.classList.contains('sign-in-htm')) {
    outputMessageVariable = "авторизован";
    return "https://neto-api.herokuapp.com/signin";
  } else if (form.classList.contains('sign-up-htm')) {
    outputMessageVariable = 'зарегистрирован';
    return "https://neto-api.herokuapp.com/signup";
  }
}

setHandlers();
