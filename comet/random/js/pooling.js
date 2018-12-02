'use strict';

const polling = new XMLHttpRequest();
const pollingTags = Array.from(document.querySelectorAll('.pooling div'));

polling.addEventListener('load', e => changeActive(pollingTags, e.currentTarget.response));


setInterval(() => {
  polling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  polling.send();
}, 5000);


function changeActive(tagArray, number) {
  const currentActive = tagArray.find(tag => tag.classList.contains('flip-it'));
  const newActive = tagArray.find(tag => tag.innerText == number);
  if (currentActive) {currentActive.classList.remove('flip-it')};
  newActive.classList.add('flip-it');
}
