'use strict';

const eyeL = document.querySelector('.cat_position_for_left_eye');
const eyeR = document.querySelector('.cat_position_for_right_eye');
const bounds = eyeL.getBoundingClientRect();

document.addEventListener('mousemove', eyeTracker);


function eyeTracker(event) {
    if (event.pageX > bounds.right) {
        eyeL.firstElementChild.style.left = 50 + '%';
        eyeR.firstElementChild.style.left = 50 + '%';
    } else if (event.pageX < bounds.left) {
        eyeL.firstElementChild.style.left = 0 + 'px';
        eyeR.firstElementChild.style.left = 0 + 'px';
    } else {
        eyeL.firstElementChild.style.left = 25 + '%';
        eyeR.firstElementChild.style.left =25 + '%';
    }

    if (event.pageY < bounds.top) {
        eyeL.firstElementChild.style.top = 0 + 'px';
        eyeR.firstElementChild.style.top = 0 + 'px';
    } else if (event.pageY > bounds.bottom) {
        eyeL.firstElementChild.style.top = 50 + '%';
        eyeR.firstElementChild.style.top = 50 + '%';
    } else {
        eyeL.firstElementChild.style.top = 25 + '%';
        eyeR.firstElementChild.style.top = 25 + '%';
    }
}
