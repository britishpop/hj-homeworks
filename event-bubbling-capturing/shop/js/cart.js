'use strict';

showMore.addEventListener('click', reloadListeners);

function reloadListeners () {
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let button of addToCartButtons) {
    button.addEventListener("click", middleman);
  }
}

function middleman (event) {
  event.preventDefault();
  const currentItem = event.target;

  if (currentItem.tagName !== "A") {
    return;
  }
  const item = {
    "title": currentItem.dataset.title,
    "price": currentItem.dataset.price
  };
  addToCart(item);
}

reloadListeners();
