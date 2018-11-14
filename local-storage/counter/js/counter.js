'use strict';

const counter = document.getElementById("counter"),
      increment = document.getElementById("increment"),
      decrement = document.getElementById("decrement"),
      reset = document.getElementById("reset");

function increaseCounter () {
  counter.innerText == 0 ? counter.innerText = 1 : counter.innerText++ ;
  saveCounter();
}

function decreaseCounter () {
  counter.innerText == 0 ? null : counter.innerText-- ;
  saveCounter();
}

function resetCounter () {
  counter.innerText = 0;
  saveCounter();
}

function initCounter(event) {
  if (event.target === increment) {
    increaseCounter();
  } else if (event.target === decrement) {
    decreaseCounter();
  } else if (event.target === reset) {
    resetCounter();
  }
}

function saveCounter () {
  document.cookie = `counter=${counter.innerText}`;
}

function loadCounter() {
  const objectifyCookies = document.cookie.split(';')
                            .map(item =>
                              ({[item.split('=')[0]
                              .trim()]:item
                              .split('=')[1]})
                            )
  const currentCounter = objectifyCookies.find(cookie => cookie.counter);
  currentCounter ? counter.innerText = currentCounter.counter :
                    counter.innerText = 0;
  document.addEventListener("click", initCounter);
}

loadCounter();
