const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  const visitorData = JSON.parse(event.data);
  if (isFirst) {
    visitorData
      .reverse()
      .forEach(data => realtime.addData([data.online], data.time));

    isFirst = false;
  } else {
    realtime.removeData();
    realtime.addData([visitorData.online], visitorData.time);
  }
});
