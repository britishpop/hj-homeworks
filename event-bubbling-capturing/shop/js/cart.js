'use strict';

showMore.addEventListener('click', reloadListeners);

function reloadListeners () {
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  list.addEventListener("click", middleman);
}

function middleman (event) {
  const currentItem = event.target;
  if (currentItem.tagName === "A" &&
      currentItem.classList.contains("add-to-cart")) {
    event.preventDefault();
    const item = {
      "title": currentItem.dataset.title,
      "price": currentItem.dataset.price
    };
    addToCart(item);
  }
}

reloadListeners();
