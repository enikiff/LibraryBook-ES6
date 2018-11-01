class AddBooksModal extends Library{
    constructor() {
      super();
          //  Library.call(this); //resets context
            this.$container = $('#add-books-modal');
            this.arrayQueue = [];
            this._bindEvents();
            let counter = '';
    }

    _bindEvents() {
        $("#cover-add-input").on("change", $.proxy(this._handleImageUpload, this));
        $("#add-books-modal form").on("submit", $.proxy(this._handleAdd, this));
        $("#add-book-btn").on("click", $.proxy(this._addQueueBooks, this));
    }

    _handleAdd(e) {

         e.preventDefault();

          const getCover = $('#add-book-cover-image').attr("src");
          const getTitle = $('#title-add-input').val();
          const getAuthor = $('#author-add-input').val();
          const getSynopsis = $("#synopsis-add-input").val();
          const getPages = $("#pages-add-input").val();
          const getDate = $("#date-add-input").val();
          const getRating = $("#rating-add-input").val();

          const tempQueueBook =
            {

                cover: getCover,
                title: getTitle,
                author: getAuthor,
                synopsis: getSynopsis,
                pages: getPages,
                date: getDate,
                rating: getRating,
            };

            $("#add-books-counter").text(counter);
            this.arrayQueue.push(tempQueueBook);



            $("#add-books-modal form")[0].reset();
            //$("#add-book-cover-image").val('');
          //  $("#add-book-cover-image").empty();

    }

    _addQueueBooks() {
      
      this.addBooks(this.arrayQueue);
      $("#add-books-counter").text("0");

      //this.handleEventTrigger('objUpdate', window.bookShelf);
      //location.reload();


}

    //Use the function below to add cover art as a base64 encoded string
    //https:www.developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    //If you get stuck reference the documents in the link above
    _handleImageUpload() {
        const preview = document.querySelector('#add-book-cover-image');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          preview.src = reader.result;
        }, false);

        if (file)
        {
          return reader.readAsDataURL(file);
        }

    }
}

//Creates new library object
//AddBooksModal.prototype = Object.create(Library.prototype);


$(() => {
  window.gAddBooksModal = new AddBooksModal();
  //window.gAddBooksModal.init();
});
