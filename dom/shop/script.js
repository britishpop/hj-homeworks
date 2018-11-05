const buttons = document.getElementsByClassName("add");
const cartCount = document.getElementById("cart-count");
const cartPrice = document.getElementById("cart-total-price");

function addToCart(event) {
  const item = event.currentTarget;
  cartCount.innerHTML++;
  const newTotal = parseInt(cartPrice.innerHTML.replace(" ",''))
                    + parseInt(item.dataset.price);
  cartPrice.innerHTML = getPriceFormatted(newTotal);
}

for (button of buttons) {
  button.addEventListener("click", addToCart);
}
