class RandomAuthorModal extends Library{
  constructor() {
    super();
    //Library.call(this); //resets context
      this.$container = $('#author-display-modal');
      this._bindEvents();
  }

  _bindEvents() {
    $("#random-author-button").on("click", () => {
      const randomAuthorName = gRandomAuthorModal.getRandomAuthorName();
      $("#author-display-modal .modal-header").html("Random to read: ");
      $("#author-display-modal .modal-body ul").html(`<li>${randomAuthorName}</li>`);
    });
  }
}

//Creates new library object
//RandomAuthorModal.prototype = Object.create(Library.prototype);

$(() => {
  window.gRandomAuthorModal = new RandomAuthorModal();
  //window.gRandomAuthorModal.init();
});
