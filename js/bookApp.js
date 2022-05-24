const bookList = document.getElementById('book-list');
const addBook = document.getElementById('add-book');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');
let bookData;

class Book {
  constructor(title = 'New Book', author = 'John Doe', id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

function getLi(title, author, id) {
  const divAuthor = document.createElement('div');
  const divTitle = document.createElement('div');
  const removeButton = document.createElement('button');
  const hr = document.createElement('hr');
  const li = document.createElement('li');

  divTitle.classList.add('author');
  divAuthor.classList.add('title');
  removeButton.classList.add('remove');
  removeButton.setAttribute('id', `button${id}`);
  removeButton.setAttribute('onclick', `javascript:StorageBooks.removeLi(${id})`);
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

class StorageBooks {
  
  static storeData() {
    localStorage.setItem('bookData', JSON.stringify(this.bookData));
  }

  static loadData() {
    bookData = [];
    const data = localStorage.getItem('bookData');
    if (data) {
      bookData = JSON.parse(data);
      bookData.forEach((book) => {
        bookList.appendChild(getLi(book.title, book.author, book.id));
      });
    }
  }

  static removeLi(id) {
    const li = document.getElementById(`book${id}`);
    li.remove();
    bookData = bookData.filter((book) => book.id !== id);
    storeData();
  }

  static addLi () {
    if (newTitle.value && newAuthor.value) {
      const id = bookData[bookData.length - 1] ? bookData[bookData.length - 1].id + 1 : 1;
      const book = new Book(newTitle.value, newAuthor.value, id);
      bookData.push(book);
      bookList.appendChild(getLi(book.title, book.author, book.id));
      storeData();
    }
  }
}

document.addEventListener('DOMContentLoaded', StorageBooks.loadData);
addBook.addEventListener('click', StorageBooks.addLi);

  