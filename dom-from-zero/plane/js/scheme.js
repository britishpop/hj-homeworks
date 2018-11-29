'use strict'

const acSelect = document.getElementById('acSelect'),
  btnSeatMap = document.getElementById('btnSeatMap'),
  btnSetFull = document.getElementById('btnSetFull'),
  btnSetEmpty = document.getElementById('btnSetEmpty'),
  seatMapDiv = document.getElementById('seatMapDiv'),
  seatMapTitle = document.getElementById('seatMapTitle'),
  totalPax = document.getElementById('totalPax'),
  totalAdult = document.getElementById('totalAdult'),
  totalHalf = document.getElementById('totalHalf');

let pax = 0, adult = 0, half = 0;

btnSetFull.setAttribute('disabled', 'disabled');
btnSetEmpty.setAttribute('disabled', 'disabled');

btnSeatMap.addEventListener('click', creatSeatMap);


function creatSeatMap(event) {
  event.preventDefault();
  while (seatMapDiv.firstChild) { seatMapDiv.removeChild(seatMapDiv.firstChild); }
  const planeId = acSelect.value;
  fetch(`https://neto-api.herokuapp.com/plane/${planeId}`)
    .then(res => res.json())
    .then(obj => {
      seatMapDiv.appendChild(createScheme(obj));
      seatMapTitle.textContent = `${obj.title} (${obj.passengers} пассажиров)`;
      seatMapDiv.addEventListener('click', choiceSeat);
      btnSetFull.addEventListener('click', event => handlerBtnSetFull(event, obj));
      btnSetEmpty.addEventListener('click', handlerBtnSetEmpty);
    });
  btnSetFull.disabled = btnSetEmpty.disabled = null;
  totalPax.textContent = totalHalf.textContent = totalAdult.textContent = 0;
}


function handlerBtnSetFull(event, obj) {
  event.preventDefault();
  seatMapDiv.querySelectorAll('.seat').forEach(div => {
    div.classList.remove('half');
    div.classList.add('adult')
  });
  totalPax.textContent = totalAdult.textContent = `${obj.passengers}`;
  totalHalf.textContent = 0;
  pax = adult = obj.passengers;
  half = 0;
}


function handlerBtnSetEmpty(event) {
  event.preventDefault();
  seatMapDiv.querySelectorAll('.seat').forEach(div => {
    div.classList.remove('half');
    div.classList.remove('adult');
  });
  totalPax.textContent = totalHalf.textContent = totalAdult.textContent = 0;
  pax = adult = half = 0;
}


function createScheme(obj) {
  return obj.scheme.reduce((fragment, currentValue, i) => {
    const row = el('div', "row seating-row text-center", [
      el('div', "col-xs-1 row-number", [el('h2', '', i + 1)])
    ]);
    if (currentValue === 6) {
      row.appendChild(addCols(obj.letters6));
    } else if (currentValue === 4) {
      row.appendChild(addCols(obj.letters4));
    }
    fragment.appendChild(row);
    return fragment;
  }, document.createDocumentFragment());
}


function addCols(arr, cls) {
  let fragment = document.createDocumentFragment(),
    z = 0, x = 0;
  for (let i = 0; i < 2; i++) {
    const col = el('div', 'col-xs-5', '');
    for (let a = 0; a < 3; a++) {
      if (arr.length === 4) {
        if (z === 0 || z === 5) {
          col.appendChild(el('div', 'col-xs-4 no-seat', ''));
        } else {
          col.appendChild(el('div', 'col-xs-4 seat', [el('span', 'seat-label', arr[x])]));
          x++;
        }
      } else {
        col.appendChild(el('div', 'col-xs-4 seat', [el('span', 'seat-label', arr[z])]));
      }
      z++;
    }
    fragment.appendChild(col);
  }
  return fragment;
}


function el(tagName, cls, children) {
  const element = document.createElement(tagName);
  element.className = cls;
  if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  } else {
    element.textContent = children;
  }
  return element;
}


function changeSeatClass(node, cls, event) {
  if (event.target.classList.contains(cls)) {
    if (node.classList.contains('adult')) {
      node.classList.remove('adult');
      adult--;
      pax--;
    } else if (node.classList.contains('half')) {
      node.classList.remove('half');
      half--;
      pax--;
    } else if (event.altKey) {
      node.classList.add('half');
      half++;
      pax++;
    } else {
      node.classList.add('adult');
      adult++;
      pax++;
    }
  }
}


function choiceSeat(event) {
  const parent = event.target.parentNode,
    evT = event.target;
  changeSeatClass(evT, 'seat', event);
  changeSeatClass(parent, 'seat-label', event);
  totalPax.textContent = `${pax}`;
  totalAdult.textContent = `${adult}`;
  totalHalf.textContent = `${half}`;
}
