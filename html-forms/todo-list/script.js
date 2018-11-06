const checkboxes = document.querySelectorAll("li input");
const counter = document.querySelector("h3 output");
const list = document.getElementsByClassName("list-block")[0];

counter.dataset.checked = 0;

function init () {
  for (let checkbox of checkboxes) {
    checkbox.addEventListener("input", counterChange);
    if (checkbox.checked) {
      counter.dataset.checked++;
    }
  }
  counter.innerHTML = `${counter.dataset.checked} из ${checkboxes.length}`;
}

function counterChange (event) {
  if (event.target.checked) {
    counter.dataset.checked++;
    if (Number(counter.dataset.checked) === checkboxes.length) {
      list.classList.add("complete");
    }
  } else {
    counter.dataset.checked--;
    list.classList.remove("complete");
  }
  counter.innerHTML = `${counter.dataset.checked} из ${checkboxes.length}`;
}

init();
