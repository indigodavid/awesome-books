const bookList = document.getElementById('book-list');
const addBook = document.getElementById('add-book');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');
let bookData = [];
class Book {
  constructor(title = 'New Book', author = 'John Doe', id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

function getLi(title, author, id) {
  let divAuthor = document.createElement('div');
  let divTitle = document.createElement('div');
  let removeButton = document.createElement('button');
  let hr = document.createElement('hr');
  let li = document.createElement('li');

  divTitle.classList.add('author');
  divAuthor.classList.add('title');
  removeButton.classList.add('remove');
  removeButton.setAttribute('id', `button${id}`);
  removeButton.setAttribute('onclick', `javascript:removeLi(${id})`);
  li.classList.add('book');
  li.setAttribute('id', `book${id}`);

  divTitle.innerHTML = title;
  divAuthor.innerHTML = author;
  removeButton.innerText = 'Remove';
  removeButton.type = 'button';

  li.appendChild(divTitle);
  li.appendChild(divAuthor);
  li.appendChild(removeButton);
  li.appendChild(hr);

  return li;
}

function storeData() {
  localStorage.setItem('bookData', JSON.stringify(bookData));
}

function loadData() {
  const data = localStorage.getItem('bookData');
  if (data) {
    bookData = JSON.parse(data);
    bookData.forEach((book) => {
      bookList.appendChild(getLi(book.title, book.author, book.id));
    });
  }
}

loadData();

addBook.addEventListener('click', (e) => {
  if(newTitle.value && newAuthor.value) {
    let id = bookData[bookData.length - 1] ? bookData[bookData.length - 1].id + 1 : 1;
    let book = new Book(newTitle.value, newAuthor.value, id);
    bookData.push(book);
    bookList.appendChild(getLi(book.title, book.author, book.id));
    storeData();
  }
});

function removeLi(id) {
  let li = document.getElementById(`book${id}`);
  li.remove();
  bookData = bookData.filter((book) => {
    return book.id !== id;
  });
  storeData();
}