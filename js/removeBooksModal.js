class RemoveBooksModal extends Library{
  constructor() {
    super();
  //  Library.call(this); //resets context
    this.$container = $('#remove-books-modal');
    this.index;
    this._bindEvents();
  }

  _bindEvents() {
    $("#remove-books-form").on("submit", $.proxy(this._handleRemove, this));
    // $("#remove-books-modal").on("click", $.proxy(this._handleUpdate, this));

  }

  _handleRemove(e) {
    e.preventDefault();
    let booksToRemoveString = $('#remove-books-form').serialize();
    this.removeAjax(booksToRemoveString);
    this.$container.modal('hide');
    $("#remove-books-form")[0].reset();
  }

  removeAjax(qString){
    $.ajax({
      url: 'http://127.0.0.1:3000/library/deleteBy?'+ qString,
      type: "DELETE",
    }).done((res, req)=>
    {
      console.log(res);
      console.log("Book was deleted.");
      this.handleEventTrigger('pagUpdate');
    }).fail(function (reg) {
      console.log("Error.");
    });
  }



}

//Creates new library object
//RemoveBooksModal.prototype = Object.create(Library.prototype);



$(() => {
  window.gRemoveBooksModal = new RemoveBooksModal();
  //window.gRemoveBooksModal.init();
});
