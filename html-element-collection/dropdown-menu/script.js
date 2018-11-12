const wrapperDropdown = document.getElementsByClassName("wrapper-dropdown")[0];

function toggleActive () {
  wrapperDropdown.classList.toggle("active");
}

wrapperDropdown.addEventListener("click", toggleActive);
