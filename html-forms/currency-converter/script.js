const content = document.getElementById("content");
const loader = document.getElementById("loader");
const source = document.getElementById("source");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const request = new XMLHttpRequest;

source.addEventListener("input", exchange);
from.addEventListener("input", exchange);
to.addEventListener("input", exchange);

request.open("GET", "https://neto-api.herokuapp.com/currency");
request.addEventListener("loadstart", () => loader.classList.remove("hidden"));
request.addEventListener("load", setupExchange);
request.addEventListener("loadend", () => loader.classList.add("hidden"));
request.addEventListener("loadend", () => content.classList.remove("hidden"));
request.send();


function setupExchange () {
  let currencies = JSON.parse(request.response);
  for (let currency of currencies) {
    from.innerHTML += `<option value="${currency.value}">${currency.code}</option>`
    to.innerHTML += `<option value="${currency.value}">${currency.code}</option>`
  }
}


function exchange () {
  let exchangeResult = source.value * from.value / to.value;
  result.innerHTML = exchangeResult.toFixed(2);
}
