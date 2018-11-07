const container = document.querySelector("ul.slides");
const slides = Array.from(document.getElementsByClassName("slide"));
const buttons = Array.from(document.querySelectorAll(".slider-nav a"));

const firstButton = buttons.find(button => button.dataset.action === "first");
const prevButton = buttons.find(button => button.dataset.action === "prev");
const nextButton = buttons.find(button => button.dataset.action === "next");
const lastButton = buttons.find(button => button.dataset.action === "last");

slides[0].classList.add("slide-current");
buttons.forEach(button => slider(button));

function slider (event) {
  const activeSlide = container.querySelector(".slide-current");

  if (!activeSlide.previousElementSibling) {
    firstButton.classList.add("disabled");
    prevButton.classList.add("disabled");
  }
  if (!activeSlide.nextElementSibling) {
    nextButton.classList.add("disabled");
    lastButton.classList.add("disabled");
  }

  firstButton.addEventListener("click", moveSlides(false, true));
  prevButton.addEventListener("click", moveSlides(false, false));
  nextButton.addEventListener("click", moveSlides(true, false));
  lastButton.addEventListener("click", moveSlides(true, true));

  function moveSlides (isForward, isMax) {
    activeSlide.classList.remove("slide-current");
    if (isForward) {
      if (isMax) {
        slides[slides.length - 1].classList.add("slide-current");
      } else {
        activeSlide.nextElementSibling.classList.add("slide-current");
      }
    } else {
      if (isMax) {
        slides[0].classList.add("slide-current");
      } else {
        activeSlide.previousElementSibling.classList.add("slide-current");
      }
    }
  }
}
