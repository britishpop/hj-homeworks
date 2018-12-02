'use strict';

const longPolling = new XMLHttpRequest();
const longPollingTags = Array.from(document.querySelectorAll('.long-pooling div'));


function subscribe(url) {

  longPolling.onreadystatechange = function() {
    if (this.readyState != 4) return;

    if (this.status == 202) {
      changeActive(longPollingTags, this.responseText.trim());
    } else {
      console.log('Произошла ошибка');
    }

    subscribe(url);
  }
  longPolling.open('GET', url);
  longPolling.send();
}


subscribe('https://neto-api.herokuapp.com/comet/long-pooling')
