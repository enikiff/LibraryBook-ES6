class RemoveBooksModal extends Library{
  constructor() {
    super();
  //  Library.call(this); //resets context
    this.$container = $('#remove-books-modal');
    this.index;
    this._bindEvents();
  }

  _bindEvents() {
    $("#remove-books-modal").on("click", $.proxy(this._handleRemove, this));
    $("#remove-books-modal").on("click", $.proxy(this._handleUpdate, this));

  }

  _handleRemove() {
  //  e.preventDefault();
    const removeTitle = $("#title-remove-input").val();
    gRemoveBooksModal.removeBookByTitle(removeTitle);
    const removeAuthor = $("#author-remove-input").val();
    gRemoveBooksModal.removeBookByAuthor(removeAuthor);
    // $("#remove-books-modal form")[0].reset();
    // this.handleEventTrigger('objUpdate', window.bookShelf);
  }

  _handleUpdate(e) {
    $("#remove-books-modal form")[0].reset();
    this.handleEventTrigger('objUpdate', window.bookShelf);
    }
}

//Creates new library object
//RemoveBooksModal.prototype = Object.create(Library.prototype);



$(() => {
  window.gRemoveBooksModal = new RemoveBooksModal();
  //window.gRemoveBooksModal.init();
});
