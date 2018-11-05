const contactData = JSON.parse(loadContacts());
const contactsList = document.getElementsByClassName("contacts-list")[0];

contactsList.innerHTML = "";

function displayContacts(contact) {
  let newLi = document.createElement("li");
  let newStrong = document.createElement("strong");

  newLi.dataset.email = contact.email;
  newLi.dataset.phone = contact.phone;
  newStrong.innerHTML = contact.name;

  contactsList.appendChild(newLi).appendChild(newStrong);
}

contactData.forEach(displayContacts);
