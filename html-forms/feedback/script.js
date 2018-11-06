const formWindow = document.querySelector("form.contentform");
const submitWindow = document.getElementById("output");
const submitButton = document.querySelector("form .button-contact");
const editButton = document.querySelector("main .button-contact");
const formFields = Array.from(document.querySelectorAll("label input"));
const zipInput = formFields.find((input) => input.name === "zip");

zipInput.type = "number";

submitButton.addEventListener("click", submitAction);
editButton.addEventListener("click", editAction);

for (let formField of formFields) {
  formField.addEventListener("input", submitForm);
}


function submitForm (event) {
  let submitValue = document.getElementById(`${event.target.name}`);
  submitButton.disabled = !formFields.every((input) => input.value.length > 0);
  if (submitValue !== null) {
    submitValue.innerHTML = event.target.value;
  }
}


function submitAction (event) {
  event.preventDefault();
  formWindow.classList.add("hidden");
  submitWindow.classList.remove("hidden");
}


function editAction (event) {
  event.preventDefault();
  submitWindow.classList.add("hidden");
  formWindow.classList.remove("hidden");
}
