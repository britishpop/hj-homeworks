'use strict';

const imageContainer = document.querySelector('.thumbs'),
      mainImage = document.getElementById('big-image'),
      colorSwatch = document.getElementById('colorSwatch'),
      sizeSwatch = document.getElementById('sizeSwatch'),
      quickCart = document.getElementById('quick-cart'),
      addToCartForm = document.getElementById('AddToCartForm'),
      addToCartButton = document.getElementById('AddToCart'),
      colorsLoaded = new Event('colo'),
      sizesLoaded = new Event('onSizesLoad');


function changePic(event) {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
    const nextPic = event.target;
    const currentPic = imageContainer.querySelector('.active');
    currentPic.classList.remove('active');
    nextPic.classList.add('active');
    mainImage.style = `background-image: url('${nextPic.parentElement.parentElement.href}')`;
  }
}


function getData(destination, type) {
  const request = fetch(destination)
    .then(res => res.json())
    .then(response => handleGetResponse(response, type))
    .catch(e => console.log(e, type));
}


function postData(destination, requestData, type) {
  const request = fetch(destination, {
    body: requestData,
    method: 'POST',
  })
    .then(res => res.json())
    .then(response => handlePostResponse(response, type))
    .catch(e => console.log(e));
}


function handleGetResponse(response, type) {
  for (let item of response) {
    if (type === 'colors') {
      colorSwatch.innerHTML += getMarkup(item, type);
    }
    if (type === 'sizes') {
      sizeSwatch.innerHTML += getMarkup(item, type);
    }
  }
  loadFormState(type);
}


function handlePostResponse(response, type) {
  let totalPrice = 0;
  quickCart.innerHTML = '';

  if (type === 'updateCart') {
    for (let item of response) {
      totalPrice = item.quantity * item.price;
      quickCart.innerHTML += getMarkup(item, type);
    }
  }
  quickCart.innerHTML += getMarkup(totalPrice, 'cart');
}


function getMarkup(item, type) {
  let availablity = '', inputState = '', cartState = '';

  if (item.isAvailable) {
    availablity = 'available';
  } else {
    availablity = 'soldout';
    inputState = 'disabled';
  }

  if (Number(item) > 0) {
    cartState = 'open';
  }

  if (type === 'colors') {
    const markup = `<div data-value="${item.type}" class="swatch-element color ${item.code} ${availablity}">
                      <div class="tooltip">${item.title}</div>
                      <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${inputState}>
                      <label for="swatch-1-${item.type}" style="border-color: ${item.type};">
                        <span style="background-color: ${item.type};"></span>
                        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                      </label>
                    </div>`;
    return markup;
  }

  if (type === 'sizes') {
    const markup = `<div data-value="${item.type}" class="swatch-element plain ${item.type} ${availablity}">
                      <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${inputState}>
                      <label for="swatch-0-${item.type}">
                        ${item.title}
                        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                      </label>
                    </div>`;
    return markup;
  }

  if (type === 'updateCart') {
    const markup = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
                      <div class="quick-cart-product-wrap">
                        <img src="${item.pic}" title="${item.title}">
                        <span class="s1" style="background-color: #000; opacity: .5">$${item.price}.00</span>
                        <span class="s2"></span>
                      </div>
                      <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
                      <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
                    </div>`;
    return markup;
  }

  if (type === 'cart') {
    const markup = `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${cartState}">
                      <span>
                        <strong class="quick-cart-text">Оформить заказ<br></strong>
                        <span id="quick-cart-price">$${item}.00</span>
                      </span>
                    </a>`;
    return markup;
  }
}


function addToCart(event) {
  event.preventDefault();
  const formData = new FormData(addToCartForm);
  formData.append('productId', addToCartForm.dataset.productId);
  postData('https://neto-api.herokuapp.com/cart', formData, 'updateCart');
}


function removeFromCart(event) {
  if (event.target.classList.contains('remove')) {
    event.preventDefault();
    const formData = new FormData;
    formData.append('productId', event.target.dataset.id);
    postData('https://neto-api.herokuapp.com/cart/remove',
              formData, 'updateCart');
  }
}


function saveFormState(event) {
  localStorage[event.target.name] = event.target.value;
}


function loadFormState(type) {
  if (type === 'colors') {
    if (localStorage.color) {
    [...colorSwatch.querySelectorAll('.swatch-element.available')]
      .find(color => color.classList.contains(localStorage.color))
      .querySelector('input')
      .checked = true;
    } else {
    [...colorSwatch.querySelectorAll('.swatch-element.available')][0]
      .querySelector('input')
      .checked = true;
    }
  }

  if (type === 'sizes') {
    if (localStorage.size) {
      [...sizeSwatch.querySelectorAll('.swatch-element.available')]
        .find(size => size.classList.contains(localStorage.size))
        .querySelector('input')
        .checked = true;
    } else {
      [...sizeSwatch.querySelectorAll('.swatch-element.available')][0]
        .querySelector('input')
        .checked = true;
    }
  }
}


function init() {
  imageContainer.addEventListener('click', changePic);
  addToCartButton.addEventListener('click', addToCart);
  quickCart.addEventListener('click', removeFromCart);
  colorSwatch.addEventListener('change', saveFormState);
  sizeSwatch.addEventListener('change', saveFormState);
  getData('https://neto-api.herokuapp.com/cart/colors', 'colors');
  getData('https://neto-api.herokuapp.com/cart/sizes', 'sizes');
}


init();
