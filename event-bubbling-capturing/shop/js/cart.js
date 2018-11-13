'use strict';

document.addEventListener('DOMContentLoaded', addHandlers);

function addHandlers () {
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  list.addEventListener("click", handleListClick);
}

function handleListClick (event) {
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
