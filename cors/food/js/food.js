'use strict';

function loadData(url) {
  const functionName = randomName();
  return new Promise ((done, fail) =>{
    window[functionName] = done
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  })
}


function recipe(data) {
  const ingredients = data.ingredients.join(', ')
  document.querySelector('[data-title]').innerHTML = data.title;
  document.querySelector('[data-ingredients]').innerHTML = ingredients;
  document.querySelector('[data-pic]').style.backgroundImage = `url(${link(data.pic)})`;
}


function rate(data) {
  document.querySelector('[data-rating]').innerHTML = data.rating.toFixed(2);
  document.querySelector('[data-votes]').innerHTML = `(${data.votes} оценок)`;
  document.querySelector('[data-star').style.width = `${data.rating/10*100}%`;
}


function consumersInfo(data) {
  let consumers = '';
  data.consumers.forEach((item, i) => {
    const info = `<img src="${link(item.pic)}" title="${item.name}">`;
    consumers +=info;
  })
  document.querySelector('[data-consumers]').innerHTML = consumers;
  const more = document.createElement('span');
  more.innerHTML = `(+${data.total})`;
  document.querySelector('[data-consumers]').appendChild(more);
}


function link(url) {
  return url.replace(/44133/,'');
}


function randomName() {
  return 'callback' + Math.round(10000 * Math.random());
}


loadData('https://neto-api.herokuapp.com/food/42')
  .then(recipe);
loadData('https://neto-api.herokuapp.com/food/42/rating')
  .then(rate);
loadData('https://neto-api.herokuapp.com/food/42/consumers')
  .then(consumersInfo);
