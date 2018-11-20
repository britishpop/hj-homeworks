'use strict';

function loadData(url) {
  const functionName = randomName();
  return new Promise ((done, fail) => {
    window[functionName] = done
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  })
}


function info(data) {
  const pic = data.pic;
  document.querySelector('[data-name]').innerHTML = data.name;
  document.querySelector('[data-description]').innerHTML = data.description;
  document.querySelector('[data-position]').innerHTML = data.position;
  document.querySelector('[data-pic]').setAttribute('src', link(pic));
  loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`)
    .then(skills)
    .then(visible);
}


function skills(data) {
  let skill = '';
  data.forEach((item, i) => {
    const span = `<span class="devicons devicons-${data[i]}"></span>`
    skill +=span;
  })
  document.querySelector('.badgescard').innerHTML = skill;
}


function visible() {
  document.querySelector('.content').style.display = 'initial';
}


function link(url) {
  return url.replace(/44133/,'');
}


function randomName() {
  return 'callback' + Math.round(10000 * Math.random());
}


loadData('https://neto-api.herokuapp.com/profile/me')
  .then(info)
