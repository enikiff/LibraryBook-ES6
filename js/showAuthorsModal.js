class ShowAuthorsModal extends Library{
  constructor() {
    super();
    this.$container = $('#all-authors-modal');
    this._bindEvents();
  }

  _bindEvents() {
    $("#show-authors-button").on("click",$.proxy(this._showAllAuthorsAjax, this));
    $("#btnCloseAuthorName").on("click",$.proxy(this._clear, this));
    $("#btnCloseModal").on("click",$.proxy(this._clear, this));
    $("#all-authors-modal").on("hidden.bs.modal", $.proxy(this._clear, this));
  }
  _showAllAuthorsAjax()
  {
      $.ajax({
        url: 'http://127.0.0.1:3000/library/',
        type: "GET",
      }).done((response)=>
      {
        window.bookShelf=bookify(response);
        let showAuthorNames = gShowAuthorsModal.getAuthors();
        console.log(showAuthorNames);
        $.each(showAuthorNames, (index, value) => {
          $("#show-authors-names").append(`<li>${value.author}</li>`);
        });
      }).fail(function (response)
      {
        console.log("Error.");
      });
  }
    //clears out the show authors modal
  _clear() {
    $("#show-authors-names").empty();
  };



}

//Creates new library object
//ShowAuthorsModal.prototype = Object.create(Library.prototype);

$(() => {
  window.gShowAuthorsModal = new ShowAuthorsModal();
});
