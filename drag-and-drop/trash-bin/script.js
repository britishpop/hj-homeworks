'use strict';

let movedLogo = null;
let logoInitialCoords = { left: 0, top: 0 };
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp)


function onMouseDown(event) {
  if (event.target.classList.contains('logo')) {
    movedLogo = event.target;
    const bounds = event.target.getBoundingClientRect();
    shiftX = event.pageX - bounds.left - window.pageXOffset;
    shiftY = event.pageY - bounds.top - window.pageYOffset;
    logoInitialCoords = { left: movedLogo.style.left, top: movedLogo.style.top };
  }
}


function onMouseMove(event) {
  if (movedLogo) {
    event.preventDefault();
    movedLogo.style.left = event.pageX - shiftX + 'px';
    movedLogo.style.top = event.pageY - shiftY + 'px';
    movedLogo.classList.add('moving');
  }
}


function onMouseUp(event) {
  if (movedLogo) {
    movedLogo.style.visibility = 'hidden';
    const trash = document // ищу корзину
      .elementFromPoint(event.clientX, event.clientY)
      .closest('#trash_bin');
    movedLogo.style.visibility = 'visible';
    if (trash) { // если корзина нашлась - положим в нее
      movedLogo.style.display = 'none';
    } else { // если корзина не была рядом - вернем на место
      movedLogo.style.left = logoInitialCoords.left;
      movedLogo.style.top = logoInitialCoords.top;
    }
    movedLogo.classList.remove('moving');
    movedLogo = null;
  }
};
