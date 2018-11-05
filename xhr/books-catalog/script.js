let catalogue;

const content = document.getElementById("content")
const request = new XMLHttpRequest;

request.open("GET", "https://neto-api.herokuapp.com/book/");
request.send();

request.addEventListener("load", bookShelf);

function bookShelf () {
  catalogue = JSON.parse(request.response);

  for (let book of catalogue) {
    let newLi = document.createElement("li");
    let newImg = document.createElement("img");

    newLi.dataset.title = book.title;
    newLi.dataset.author = book.author.name;
    newLi.dataset.info = book.info;
    newLi.dataset.price = book.price;

    newImg.src = book.cover.small;

    content.appendChild(newLi).appendChild(newImg);
  }
}
