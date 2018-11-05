const content = document.getElementById("content");
const preloader = document.getElementById("preloader");
const tabs = document.querySelectorAll("nav a");

function parseData (data) {
  console.log(data);
}

function showContent (event) {
  event.preventDefault();
  const destination = event.currentTarget.getAttribute("href");

  const request = new XMLHttpRequest();
  request.addEventListener("loadstart", () => preloader.classList.remove("hidden"));
  request.addEventListener("loadend", () => preloader.classList.add("hidden"));
  request.addEventListener("load", parseData(request.responseText));

  request.open("GET", destination, true);
  request.send();
}

for (let tab of tabs) {
  tab.addEventListener("click", showContent);
}
