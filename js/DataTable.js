class DataTable extends Library{
  constructor() {
    super();
    //Library.call(this);
    this.$container = $('#data-table');
    this._bindEvents();
    this._updateStorage();

  //  this.newBookArray = [];
  //  var editBookArray = [];
  }

  _bindEvents() {

    $(document).on('submit', $.proxy(this._handleSearch, this));
    $(document).on('objUpdate', $.proxy(this._updateTable, this));
    $(document).on('click', $.proxy(this._updateStorage,this));
    $(document).on('click', '#edButton', $.proxy(this._handleEdit,this));
    $(document).on('click', '#delButton', $.proxy(this._handleDelete,this));

}

  // DataTable.prototype._handleSearch = function (e)
  // {
  //   e.preventDefault();
  //   var serArr = $('#search-form').serializeArray();
  //   var myObj = {};
  //   $.each(serArr,function(index, entry){
  //     if(entry.value){
  //       myObj[entry.name] = entry.value;
  //     }
  //   });
  //   var searchResults = this.search(myObj);
  //   this.handleEventTrigger('objUpdate', searchResults);
  //
  //   return false;
  // };

  _handleDelete(e) {
    let bookTitle = "";
    let myTd;
    bookTitle = $(e.target).closest('tr').children('td:nth-child(2)').text();//BY USING .DATA ATTRIBUTE
  console.log(bookTitle);
    if (confirm(`Are you sure you want to delete ${bookTitle}?`)) {
      this.removeBookByTitle(bookTitle);
      this._makeTable(window.bookShelf);
  return true;
    }
  return false;
  }

  _handleEdit(e) {
    let bookTitle = "";
    let myTd;
    bookTitle = $(e.target).closest('tr').children('td:nth-child(2)').text();//BY USING .DATA ATTRIBUTE
    //var title = $(e.target).parent().siblings('.bookTitle').text();


    const myBook = this.getSingleBookByTitle(bookTitle);


    if (myBook) {
          $("#title-edit-input").val(myBook.title);
          $("#author-edit-input").val(myBook.author);
          $("#rating-edit-input").val(myBook.rating);
          $("#pages-edit-input").val(myBook.numberOfPages);
          $("#date-edit-input").val(myBook.publishDate);
          $("#synopsis-edit-input").val(myBook.synopsis);
  }
    // if (confirm("Do you want to edit this book " + bookTitle +'?')) {



    $('#edit-books-modal').modal("show");
  //return true;





  }

  //     //-----------------------------------------------------//
  //
  //     var editTitle = $("#title-edit-input").val(bookTitle);
  //     var editAuthor =$("#author-edit-input").val(bookAuthor);
  //     var editSynopsis =$("#synopsis-edit-input").val(bookSynopsis);
  //     var editPages =$("#pages-edit-input").val(bookPages);
  //
  // //-------------------------------------------------------------//
  //
  //     if (confirm("Do you want to edit this book " + '"' + bookTitle + '" ' + '?')) {
  //     $('#edit-books-modal').modal('show');

  //var getCover = $("#add-book-cover-image").attr("src");
  // var editTitle = $("#title-add-input").val(bookTitle);
  // var editAuthor =$("#author-add-input").val(bookAuthor);
  // var editSynopsis =$("#synopsis-add-input").val(bookSynopsis);
  // var editPages =$("#pages-add-input").val(bookPages);
  //var newTitle =$("#date-add-input").val(bookDate);
  //var newTitle =$("#rating-add-input").val(bookRating);
  //     editBookArray =
  //     {
  //         newTitle: editTitle,
  //         newAuthor: editAuthor,
  //         newSynopsis: editSynopsis,
  //         newPages: editPages,
  //     };
  //     return true;
  //
  // }
  //
  //     this.newBookArray.push(editBookArray);
  //     console.log(this.newBookArray);
  //     counter ++;
  //     $("#edit-books-modal form")[0].reset();
  // console.log(this.newBookArray);
  // //return false;
  //
  //
  //
  //     (this.addBooks).replaceWith(this.newBookArray);
  //     $("#add-books-counter").text("0");
  //     this.handleEventTrigger('objUpdate', window.bookShelf);
  // };

  //this.addBooks(this.newBookArray);



  _handleSearch(e) {
    e.preventDefault();
    const myObj = {};
    myObj.title = $("#search-form").find("#title-search-input").val();
    //alert("I'm searching");
    myObj.author = $("#search-form").find("#author-search-input").val();

    this._makeTable(this.search(myObj));

  }

  _updateTable(e) {

    this._makeTable(e.detail);
  }

  _makeTable(books) {
    const _self = this;
    const $tbody = this.$container.find('tbody');
    $tbody.empty();
    $('#books-table-head').html(this._createHead(new Book({})));
    $.each(books, (index, book) => {
      $tbody.append(_self._createRow(book));
    });
  }

  _createHead(book) {
    const tr = $('<tr>');
    for (const key in book) {
      const th = $('<th>').text(spacesToCamelCase(key));
      tr.append(th);
  }
    const eTH = $('<th>').text('Edit Book');
    tr.append(eTH);
    //return tr;
    const dTH = $('<th>').text('Delete Book');
    tr.append(dTH);
    return tr;

  }

  _createRow(book) {
    const tr = $('<tr>');
    //This created our delete column
    const deleteInput = $('<button>').text("Delete book").attr('type', 'button').attr('id', 'delButton');

    const editInput = $('<button>').text("Edit Book").attr('type', 'button').attr('id', 'edButton');

    for(const key in book){
      const td = $('<td>');
      if (key === 'cover') {
        const img = $('<img>').addClass('tableImg').attr('src', book[key]);
        $(td).html(img);
      } else if(key === 'rating'){
        $(td).html(this._stars(book[key]));
      } else if(key === 'title'){
        $(editInput).data('title',book[key]);
        $(td).html(book[key]);
      }
      else {
        $(td).html(key === 'synopsis' ? `${book[key].substring(0,85)}...` : book[key]);
      }
      tr.append(td);
    }
    //append created editbutton to editTd
    //append editTd to tr
    const editTd = $('<td>');
    $(editTd).append(editInput);
    // line 161 moves the checkboxes to the right//
    const deleteTd = $('<td>');
    $(deleteTd).append(deleteInput);
    tr.append(editTd);
    tr.append(deleteTd);
    return tr;
  }

  _stars(rating) {
    const $div = $('<div>');
    for(let i=0; i<5; i++) {
      const $star = $('<span>').addClass('fa fa-star');
      if(i<rating){ $star.addClass('checked'); }
      $div.append($star);
    }
    return $div;
  }

  _updateStorage() {
    if (window.localStorage.length > 0) {
      console.log('BOOKSHELF EXISTS SETTING VALUE');
      window.bookShelf = this.getStorage();
      this.handleEventTrigger('objUpdate',window.bookShelf);
    } else {
      console.log('BOOKSHELF DOES NOT EXIST ADDING BOOKS!');

      this.addBooks(bookify(bookList));
      this.handleEventTrigger('objUpdate',window.bookShelf);
      this.setStorage();
    }
  }
}

//DataTable.prototype = Object.create(Library.prototype);

//This is the document ready that will create a new instance of DataTable
//HINT: Each class||object will need a new instance to be initalized on document ready!
// document.addEventListener("DOMContentLoaded", function(e){
//  window.gLibrary = new Library();
$(() => {
  window.gDataTable = new DataTable();
//  window.gDataTable.init();
});
