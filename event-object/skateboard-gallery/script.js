(function(){
  const mainPic = document.getElementById("view");
  let mainSkate = document.querySelector(".gallery-current")
  const container = document.getElementById("nav");

  const makeMain = function (event) {
    event.preventDefault();

    let currentTarget;
    if (event.target.tagName === "IMG") {
      currentTarget = event.target.parentNode;
    } else if (event.target.tagName === "A") {
      currentTarget = event.target;
    }

    mainSkate.classList.remove("gallery-current");
    currentTarget.classList.add("gallery-current");
    mainPic.src = currentTarget.href;
    mainSkate = currentTarget;
  }
  container.addEventListener("click", makeMain)
})();
