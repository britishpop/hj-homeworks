'use strict';

const script = document.createElement('script');
script.src = 'https://neto-api.herokuapp.com/twitter/jsonp';
document.body.appendChild(script);

function callback(data) {
  const userpic = link(data.pic);
  const wallpaper = link(data.wallpaper);

  document.querySelector('[data-pic]').setAttribute('src', userpic);
  document.querySelector('.bg').setAttribute('src', wallpaper);

  document.querySelector('[data-username]').innerText = data.username;
  document.querySelector('[data-description]').innerText = data.description;
  document.querySelector('[data-tweets]').innerText = data.tweets;
  document.querySelector('[data-followers]').innerText = data.followers;
  document.querySelector('[data-following]').innerText =  data.following;
}

function link(link) {
  return link.replace(/44889/,'');
}
