const content = document.getElementById("content");
const preloader = document.getElementById("preloader");
const tabs = document.querySelectorAll("nav a");

function onTabClick (event) {
	event.preventDefault();
	const clickedTab = event.currentTarget;
	const activeTab = document.querySelector("nav a.active");
	if (clickedTab !== activeTab) {
		activeTab.classList.remove("active");
		clickedTab.classList.add("active");
	}
	showContent(clickedTab);
}

function showContent (tab) {
  const destination = tab.getAttribute("href");
  const request = new XMLHttpRequest();

  request.addEventListener("loadstart", () => preloader.classList.remove("hidden"));
  request.addEventListener("loadend", () => preloader.classList.add("hidden"));
  request.addEventListener("load", () => content.innerHTML = request.response);

  request.open("GET", destination);
  request.send();
}

for (let tab of tabs) {
  tab.addEventListener("click", onTabClick);
}

showContent(document.querySelector("nav .active"));
