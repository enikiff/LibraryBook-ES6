class RandomAuthorModal extends Library
{
  constructor() {
    super();
    //Library.call(this); //resets context
      this.$container = $('#random-author-modal');
      this._bindEvents();
  }

  _bindEvents()
  {
    $("#random-author-button").on("click",$.proxy(this._randomAuthorAjax, this));
    $("#btnCloseAuthorName").on("click",$.proxy(this._clear, this));
    $("#random-author-modal").on("hidden.bs.modal", $.proxy(this._clear, this));
  }
  _randomAuthorAjax()
  {
      $.ajax({
        url: 'http://127.0.0.1:3000/library/',
        type: "GET",
      }).done((response)=>
      {
        window.bookShelf=bookify(response);
        const randomAuthorName = this.getRandomAuthorName(response);

        $("#random-author").append(`<li>${randomAuthorName}</li>`);
console.log(randomAuthorName);
      }).fail(function (response)
      {
        console.log("Error.");
      });
  }
  _clear() {
    $("#random-author").empty();
  };
}

$(() => {
  window.gRandomAuthorModal = new RandomAuthorModal();
});
