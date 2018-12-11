'use strict';

const eyeL = document.querySelector('.cat_position_for_left_eye');
const eyeR = document.querySelector('.cat_position_for_right_eye');
const boundLeft = eyeL.getBoundingClientRect();
const boundRight = eyeR.getBoundingClientRect();

function moveEye(eye, value, position){
  if (position === 'left') {
    eye.firstElementChild.style.left = `${value}%`;
  } else if (position === 'top'){
    eye.firstElementChild.style.top = `${value}%`;
  }
}

function init(e, bound, eye) {
  if (e.pageX > bound.right) {
    moveEye(eye, 50, 'left');
  } else if (e.pageX < bound.left) {
    moveEye(eye, 0, 'left');
  } else {
    moveEye(eye, 25, 'left');
  }

  if (e.pageY < bound.top) {
    moveEye(eye, 0, 'top');
  } else if (e.pageY > bound.bottom) {
    moveEye(eye, 50, 'top');
  } else {
    moveEye(eye, 25, 'top');
  }
}

document.addEventListener('mousemove', (e) => {
  init(e, boundLeft, eyeL);
  init(e, boundRight, eyeR);
});
