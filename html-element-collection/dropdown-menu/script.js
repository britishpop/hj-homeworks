const wrapperDropdown = document.getElementsByClassName("wrapper-dropdown");
const dropdownList = document.getElementsByClassName("wrapper");

function toggleActive () {
  wrapperDropdown[0].classList.toggle("active");
}

wrapperDropdown[0].onclick = toggleActive;
dropdownList[0].onclick = toggleActive;
