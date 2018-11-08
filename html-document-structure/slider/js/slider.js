const container = document.querySelector("ul.slides");
const buttons = Array.from(container.parentElement.querySelectorAll(".slider-nav a"));


function slider(container) {
  const firstCurrent = container.firstElementChild;
  firstCurrent.classList.add("slide-current");
  buttons.forEach(button => button.addEventListener("click", moveSlides));
  updateDisabled(firstCurrent);
}


function moveSlides (event) {
  const pressedButton = event.currentTarget;

  if (pressedButton.classList.contains("disabled")) {
    return;
  }

  const currentSlide = container.querySelector(".slide-current");
  let activatedSlide;

  switch (pressedButton.dataset.action) {
    case "first":
      activatedSlide = currentSlide.parentElement.firstElementChild;
      break;
    case "prev":
      activatedSlide = currentSlide.previousElementSibling;
      break;
    case "next":
      activatedSlide = currentSlide.nextElementSibling;
      break;
    case "last":
      activatedSlide = currentSlide.parentElement.lastElementChild;
      break;
  }

  currentSlide.classList.remove('slide-current');
  activatedSlide.classList.add('slide-current');

  updateDisabled (activatedSlide);
}


function updateDisabled (currentSlide) {
  if (!currentSlide.previousElementSibling) {
    buttons.find(button => button.dataset.action === "prev").classList.add("disabled");
    buttons.find(button => button.dataset.action === "first").classList.add("disabled");
  } else if (!currentSlide.nextElementSibling) {
    buttons.find(button => button.dataset.action === "next").classList.add("disabled");
    buttons.find(button => button.dataset.action === "last").classList.add("disabled");
  }
  if (currentSlide.previousElementSibling) {
    buttons.find(button => button.dataset.action === "prev").classList.remove("disabled");
    buttons.find(button => button.dataset.action === "first").classList.remove("disabled");
  } else if (currentSlide.nextElementSibling) {
    buttons.find(button => button.dataset.action === "next").classList.remove("disabled");
    buttons.find(button => button.dataset.action === "last").classList.remove("disabled");
  }
}

slider(container);
