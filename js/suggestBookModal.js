class SuggestBooksModal extends Library{
  constructor() {
    super();
      //Library.call(this); //resets context
      this.$container = $('#book-display-modal');
      this._bindEvents();
  }

  _bindEvents() {

  $("#random-book-button").on("click", $.proxy(this._suggestBookModal, this));
  $("#btnCloseSugBook").on("click", $.proxy(this._eraseSuggestModal, this));
  $("#book-display-modal .close").on("click", $.proxy(this._eraseSuggestModal, this));

  }

  _suggestBookModal() {
      const randomBook = gSuggestBooksModal.getRandomBook();
      const formElement = "#book-display-modal .modal-body .modal-sidebar";
      //$("#suggestModalBook").text("Title: " + randomBook.title);
      $('#book-display-modal .book-cover').append($('<img>').attr("src",randomBook.cover));
      $(formElement).append(`<p>Title: ${randomBook.title}</p>`);
      $(formElement).append(`<p>Author: ${randomBook.author}</p>`);
      $(formElement).append(`<p>Synopsis: ${randomBook.synopsis}</p>`);
      $(formElement).append(`<p>Number of Pages: ${randomBook.numberOfPages}</p>`);
      $(formElement).append(`<p>Rating: ${randomBook.rating}</p>`);
      $(formElement).append(`<p>Date: ${randomBook.publishDate}</p>`);
    // SuggestBooksModal.prototype._displayStars(e){
    //           for(let i=0; i<5; i++) {
    //             let $star = $('<span>').addClass('fa fa-star');
    //             if(i<book.rating){ $star.addClass('checked'); }
    //             $("#modal-sidebar").append($star);
    //           }
    // }
  //this._displayStars(book);
}

  _eraseSuggestModal() {
      $("#book-cover").empty();
      $("#modal-sidebar").empty();
  }
}

//Creates new library object
//SuggestBooksModal.prototype = Object.create(Library.prototype);


$("book-display-modal .modal-sidebar").append(DataTable.prototype._stars)

$(() => {
    window.gSuggestBooksModal = new SuggestBooksModal();
  //  window.gSuggestBooksModal.init();
});
