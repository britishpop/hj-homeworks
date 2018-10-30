(function(){
  const mainPic = document.getElementById("view");
  let mainSkate = document.querySelector(".gallery-current")
  const container = document.getElementById("nav");

  const makeMain = function (event) {
    event.preventDefault();
    console.log(event.target.parentNode);
    const currentTarget = event.target.parentNode;
    mainSkate.classList.remove("gallery-current");
    currentTarget.classList.add("gallery-current");
    mainPic.src = currentTarget.href;
    mainSkate = currentTarget;
  }
  container.addEventListener("click", makeMain)
})();
