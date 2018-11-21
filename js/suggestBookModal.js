class SuggestBooksModal extends Library
{
  constructor() {
    super();
      //Library.call(this); //resets context
     this.$container = $('#book-display-modal');
      this._bindEvents();
  }

  _bindEvents()
  {
      $("#random-book-button").on("click", $.proxy(this._suggestBookAjax, this));
      $("#btnCloseSugBook").on("click", $.proxy(this._eraseSuggestModal, this));
      $("#book-display-modal").on("hidden.bs.modal", $.proxy(this._eraseSuggestModal, this));
  }
  _suggestBookAjax()
  {
      $.ajax({
        url: 'http://127.0.0.1:3000/library/',
        type: "GET",
      }).done((response)=>
      {
        window.bookShelf=bookify(response);
        this._suggestBookModal(response);
      }).fail(function (reg) {
        console.log("Error.");
      });
  }
  _suggestBookModal(response)
  {
      const randomBook = gSuggestBooksModal.getRandomBook();
      const formElement = "#book-display-modal .modal-body .modal-sidebar";
      $('#book-display-modal .book-cover').append($('<img>').attr("src",randomBook.cover));
      $(formElement).append(`<p>Title: ${randomBook.title}</p>`);
      $(formElement).append(`<p>Author: ${randomBook.author}</p>`);
      $(formElement).append(`<p>Synopsis: ${randomBook.synopsis}</p>`);
      $(formElement).append(`<p>Number of Pages: ${randomBook.numPages}</p>`);
      $(formElement).append(`<p>Rating: ${randomBook.rating}</p>`);
      $(formElement).append(`<p>Date: ${randomBook.pubDate}</p>`);
  }

  _eraseSuggestModal()
  {
      $("#book-cover").empty();
      $("#modal-sidebar").empty();
  }
}

$(() => {
    window.gSuggestBooksModal = new SuggestBooksModal();
  //  window.gSuggestBooksModal.init();
});
