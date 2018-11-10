const nav = document.querySelector("ul.tabs-nav");
const container = document.querySelector(".tabs-content");
const articleList = container.children;


function showreel () {
  const tabsList = nav.children;

  sortArticles(tabsList[0], articleList);
  makeActive(tabsList[0]);

  for (let tab of tabsList) {
    tab.addEventListener("click", tabOnClick);
  }
}


function sortArticles (demoTab, articleList) {
  const categories = Array.from(nav.getElementsByTagName("a"));
  for (let article of articleList) {
    const title = article.dataset.tabTitle;
    const icon = article.dataset.tabIcon;
    if (!categories.find(tab => tab.innerText === title)) {
      const newCategory = demoTab.cloneNode(true);
      newCategory.firstElementChild.innerText = title;
      newCategory.firstElementChild.classList.add(icon);
      nav.appendChild(newCategory);
    }
  demoTab.remove();
  }
}


function tabOnClick (event) {
  event.preventDefault();
  makeActive(event.currentTarget);
}


function makeActive(activatedTab) {
  const currentTab = nav.querySelector(".ui-tabs-active");
  if (currentTab) {
    currentTab.classList.remove("ui-tabs-active");
    activatedTab.classList.add("ui-tabs-active");
  } else {
    nav.firstElementChild.classList.add("ui-tabs-active");
  }
  for (let article of articleList) {
    if (article.dataset.tabTitle.toUpperCase() === activatedTab.firstElementChild.innerText) {
      article.classList.remove("hidden");
    } else {
      article.classList.add("hidden");
    }
  }
}


showreel();
