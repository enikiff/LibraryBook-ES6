class Library {
  handleEventTrigger(sEvent, oData) {
    var oData = oData || {};
    if(sEvent) {
      const event = new CustomEvent(sEvent, {'detail':oData});
      document.dispatchEvent(event);
    }
  }

  addBook(book) {
    for(let i = 0; i < window.bookShelf.length; i++) {
      if(book.title.toLowerCase().trim() === window.bookShelf[i].title.toLowerCase().trim()){
        console.log(`Sorry ${book.title} already exists.`);
        return false;
      }
    }
    console.log(`added ${book.title} to book shelf`);
    window.bookShelf.push(book);
    this.setStorage();
    return true;
  }

  removeBookByTitle(title) {
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].title.toLowerCase() === title.toLowerCase()) {
        console.log(`removed ${window.bookShelf[i].title} from book shelf`);
        window.bookShelf.splice(i,1);
        this.setStorage();
        return true;
      }
    }
    return false;
  }

  removeBookByAuthor(author) {
    let booksRemoved = false;
    for (let i = window.bookShelf.length - 1; i >= 0; i--) {
      if (window.bookShelf[i].author.toLowerCase() === author.toLowerCase()) {
        window.bookShelf.splice(i, 1);
        booksRemoved = true;
        this.setStorage();
      }
    }

    return booksRemoved;
  }

  getRandomBook() {
    if(window.bookShelf.length){
      return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))];
    }

    return null;
  }

  getBookByTitle(title) {
    const matchedArr = [];
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].title.search(title) >= 0){
        matchedArr.push(window.bookShelf[i]);
      }
    }
    return matchedArr;
  }

  getBooksByAuthor(authorName) {
    const matchedArr = [];
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].author.search(authorName) >= 0){
        matchedArr.push(window.bookShelf[i]);
      }
    }
    return matchedArr;
  }

  getSingleBookByTitle(title) {
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].title.toLowerCase() === title.toLowerCase()){
        return window.bookShelf[i];
      }
    }
    return false;
  }

  //window.bookShelf[this.getBookIndex(this.tempBook.title)].editBook(myObj);

  getBookIndex(title) {
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].title.toLowerCase().search(title.toLowerCase()) >= 0){
        return i;
      }
    }
    return false;
  }

  addBooks(books) {
    let counter = 0;
    for (let i = 0; i < books.length; i++) {
      if (this.addBook(books[i])) {
        counter++;
      }
    }
    this.setStorage();
    return counter;
  }

  getAuthors() {
    if (window.bookShelf.length) {
      return window.bookShelf.unique("title");
    }
    return [];
  }

  getRandomAuthorName() {
    if (!window.bookShelf.length) {
      return null;
    } else {
      return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))].author;
    }
  }

  search(
    //searchParams is an object
    searchParams) {
      let searchResults = [];
      if (searchParams.title) {
          searchResults = searchResults.concat(window.gDataTable.getBookByTitle(searchParams.title));
      }
      if (searchParams.author) {
          searchResults = searchResults.concat(window.gDataTable.getBooksByAuthor(searchParams.author));
      }
          searchResults = searchResults.unique("title");
          return searchResults;
  }

  getStorage() {
    const arr = [];
    const parsedObj = JSON.parse(localStorage.getItem("myLibrary"));
    for (let i = 0; i < parsedObj.length; i++) {
      arr.push(new Book(parsedObj[i]));
    }
    return arr;
  }

  setStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(window.bookShelf));
    return console.log("STORAGE HAS BEEN SET");
  }

init() {
    this.setStorage();
}
}
    $(() => {
    window.myLibrary = new Library();
    window.bookShelf = window.bookList;
    window.myLibrary.init();
  });
