class ShowAuthorsModal extends Library{
  constructor() {
    super();
    //Library.call(this); //resets context
    this.$container = $('#author-display-modal');
    this._bindEvents();
  }

  _bindEvents() {
    $("#show-authors-button").on("click", () => {
      const showAuthorNames = gShowAuthorsModal.getAuthors();
      for (let i = 0; i < showAuthorNames.length; i++) {
      $("#author-display-modal .modal-body ul").html(`<li>${showAuthorNames[i].author}</li>`);
      }
    });
  }
}

//Creates new library object
//ShowAuthorsModal.prototype = Object.create(Library.prototype);

$(() => {
  window.gShowAuthorsModal = new ShowAuthorsModal();
});
