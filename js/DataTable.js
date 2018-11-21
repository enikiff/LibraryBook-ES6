class DataTable extends Library
{
    constructor()
    {
      super();
      this.$container = $('#data-table');
      this.newBookArray = [];
      this._init();
      //this.queryString = "";
      // this.bookShelfLength = 0;
      // this.currentPage = 1;
      // this.pageLimit = 3;
    }

    _init(){
      this._bindEvents();
      this._firePagination(1,3);
      this._fireGetBookShelfLength();
    }

    _bindEvents(){
        $(document).on("submit", $.proxy(this._handleSearch,this));
        $(document).on('objUpdate', $.proxy(this._updateTable, this));
        $(document).on('pagUpdate', $.proxy(this._updatePaginate, this));
        $(document).on('click', '#edButton', $.proxy(this._handleEdit,this));
        $(document).on('click', '#delButton', $.proxy(this._handleDelete,this));
        $("#edit-books-modal form").on("submit", $.proxy(this._handleEditAdd, this));
        $("#cover-edit-input").on("change", $.proxy(this._handleImageUpload, this));
        $("#show-books-button").on("click", $.proxy(this._refreshAllBooks, this));
        $("#prev").on('click', $.proxy(this._handlePrevPage, this));
        $("#last").on('click', $.proxy(this._handleNextPage, this));

    };

  _handleNextPage(){
    if (window.currentPage !== window.totalPages) {
      window.currentPage++;
      this._firePagination(window.currentPage,window.numResultsPerPage)
    }
  }

  _handlePrevPage(){
    if (window.currentPage !== 1) {
      window.currentPage--;
      this._firePagination(window.currentPage,window.numResultsPerPage)
    }
  }

  _fireCalcTotalPages(){
     window.totalPages = Math.ceil(window.bookShelfLength/window.numResultsPerPage);
     $("#score").text(window.currentPage + ' / ' + totalPages);
  }

  _fireGetBookShelfLength(){
      let _self=this;
      $.ajax({
           url: "http://127.0.0.1:3000/Library/count",
           method: "GET",
           dataType: "json",
      }).done(response => {
         window.bookShelfLength = response.bookCount;
         _self._fireCalcTotalPages();
      })

  };
   //currentPage, pageLimit
_firePagination(currentPage, numResultsPerPage, qString)
 {
   var myUrl = "";
   if (qString) {
    myUrl = `http://127.0.0.1:3000/Library/${currentPage}/${numResultsPerPage}/searchBy?${qString}`
   }else{
    myUrl = `http://127.0.0.1:3000/Library/${currentPage}/${numResultsPerPage}/searchBy?`
   }

   const _self = this;
   $.ajax(
    {
         url: myUrl,
         method: "GET",
         dataType: "json",
    }).done(response => {
         //this.currentPage=bookify(response);
         window.bookShelf=bookify(response.books);
         window.bookShelfLength = response.count;
         this.handleEventTrigger('objUpdate',window.bookShelf);
         _self._fireCalcTotalPages();
    }).fail(response => {
         console.log("Error.");
    });
 };

  _firePost(books){

    //var _self = this;
    $.ajax({
         url: "http://127.0.0.1:3000/Library",
         type: "POST",
         //contentType:"application/json; charset=utf-8",
         data: books,
    }).done((response)=> {
         console.log(response);
    }).fail(books => {
         console.log("Error posting book.");
    });
  };
  _fireDelete(id) {
     var _self = this;
     $.ajax({
         url: this.url + "/"+id,
         type: "DELETE",
       //data: id,
       //  dataType: "text",
       //contentType:"text/html; charset=utf-8",
     }).done((res, req)=>
     {
       console.log(res, req);
       console.log("Book was deleted.");
 //_self._getAll();
     }).fail(function (reg) {
       console.log("Error deleting comment.");
     });

   };

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

  _handleDelete(e)
    {
      let bookTitle = "";
      let myTd;
      bookTitle = $(e.target).closest('tr').children('td:nth-child(2)').text();//BY USING .DATA ATTRIBUTE
    console.log(bookTitle);
      if (confirm(`Are you sure you want to delete ${bookTitle}?`))
        {
          this.removeBookByTitle(bookTitle);
          this._makeTable(window.bookShelf);
      return true;
        }
    return false;
    };

  _handleEdit(e)
    {
      let bookTitle = "";
      let myTd;
      bookTitle = $(e.target).closest('tr').children('td:nth-child(2)').text();//BY USING .DATA ATTRIBUTE
      //var title = $(e.target).parent().siblings('.bookTitle').text();

      if (confirm(`Do you want to edit this book ${bookTitle}?`))
          {
            $('#edit-books-modal').modal("show");
          };
          let myBook = this.getSingleBookByTitle(bookTitle);

          if (myBook)
           {
              $("#edit-book-cover-image").attr("src");
              $("#title-edit-input").val(myBook.title);
              $("#author-edit-input").val(myBook.author);
              $("#synopsis-edit-input").val(myBook.synopsis);
              $("#pages-edit-input").val(myBook.numPages);
              $("#date-edit-input").val(myBook.pubDate);
              $("#rating-edit-input").val(myBook.rating);
          }
    };

   _handleEditAdd(e)
   {
        e.preventDefault();
         let getEditTitle = $('#title-edit-input').val();
         let getEditAuthor = $('#author-edit-input').val();
         let getEditSynopsis = $("#synopsis-edit-input").val();
         let getEditPages = $("#pages-edit-input").val();
         let getEditDate = $("#date-edit-input").val();
         let getEditRating = $("#rating-edit-input").val();
         let getEditCover = $('#edit-book-cover-image').attr("src");

         let tempEditBook =
           {
               cover: getEditCover,
               title: getEditTitle,
               author: getEditAuthor,
               synopsis: getEditSynopsis,
               pages: getEditPages,
               date: getEditDate,
               rating: getEditRating,
           };
          $("#add-book-cover-image").attr('src','#');
          this.handleEventTrigger('objUpdate',window.bookShelf);
          const myIndex = this.getBookIndex(this.tempEditBook);
          console.log(myIndex);
          //window.bookShelf[myIndex].EditBook(this.myBook);

      };

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



  _handleSearch(e)
    {
      e.preventDefault();
      const serArr = $("#search-form").serialize();
      this.searchAjax(serArr,1,3);
      $("#search-form")[0].reset();
    };

    searchAjax(qString, currentPage, numResultsPerPage)
  {
    console.log(qString);
      $.ajax({
        url: `http://127.0.0.1:3000/library/${currentPage}/${numResultsPerPage}/searchBy?${qString}`,
        type: "GET",
      }).done((res, req)=> {
        console.log(res);  //return found book
        window.bookShelf = bookify(res.books);
        window.bookShelfLength = res.count
        this.handleEventTrigger('pagUpdate');

        console.log("Book found.");
      }).fail(function (reg) {
        console.log("Error.");
      });
  }

  _updatePaginate(e){
    this._fireGetBookShelfLength();
    this._firePagination(window.currentPage,window.numResultsPerPage,window.searchString);
  }


  _updateTable(e)
    {
      this._makeTable(e.detail);
    }

  _makeTable(books)
    {
      const _self = this;
      const $tbody = this.$container.find('tbody');
      $tbody.empty();
      $('#books-table-head').html(this._createHead(new Book({})));
      $.each(books, (index, book) =>
        {
          $tbody.append(_self._createRow(book));
        });
    };

  _createHead(book)
    {
      const tr = $('<tr>');
      for (const key in book)
          {
            const th = $('<th>').text(spacesToCamelCase(key));
            tr.append(th);
          }
      const eTH = $('<th>').text('Edit Book');
      tr.append(eTH);
      //return tr;
      const dTH = $('<th>').text('Delete Book');
      tr.append(dTH);
      return tr;

    };
  _refreshAllBooks()
    {
      this.handleEventTrigger('objUpdate',window.bookShelf);
    }



    // _fireGe()
    //   {
    //     $.ajax(
    //       {
    //           url: "http://127.0.0.1:3000/Library/",
    //           method: "GET",
    //           dataType: "json",
    //       }).done(response =>
    //       {
    //           // this.currentPage = bookify(response)
    //           window.bookShelf=bookify(response);
    //           console.log(response);
    //           this.handleEventTrigger('objUpdate',window.bookShelf);
    //       }).fail(response =>
    //       {
    //           console.log("Error.");
    //       });
    //   };


  _createRow(book)
    {
        const tr = $('<tr>');
        //This created our delete column
        const deleteInput = $('<button>').text("Delete book").attr('type', 'button').attr('id', 'delButton');

        const editInput = $('<button>').text("Edit Book").attr('type', 'button').attr('id', 'edButton');

        for(const key in book)
        {
            const td = $('<td>');
            if (key === 'cover')
              {
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
              if (key !== '_id' && key !== '__v') { // NOTE: stops id or v from being displayed in td
                tr.append(td)
              }
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

  _stars(rating)
      {
          const $div = $('<div>');
          for(let i=0; i<5; i++)
           {
              const $star = $('<span>').addClass('fa fa-star');
              if(i<rating){ $star.addClass('checked'); }
              $div.append($star);
            }
        return $div;
      }

  // _updateStorage()
  // {
  //       if (window.localStorage.length > 0) {
  //         console.log('BOOKSHELF EXISTS SETTING VALUE');
  //         window.bookShelf = this.getStorage();
  //         this.handleEventTrigger('objUpdate',window.bookShelf);
  //       } else {
  //         console.log('BOOKSHELF DOES NOT EXIST ADDING BOOKS!');
  //
  //         this.addBooks(bookify(bookList));
  //         this.handleEventTrigger('objUpdate',window.bookShelf);
  //         this.setStorage();
  //       }
  // };
  _handleImageUpload()
  {
          const preview = document.querySelector('#edit-book-cover-image');
          const file = document.querySelector('input[type=file]').files[0];
          const reader = new FileReader();

          reader.addEventListener("load", () => {
            preview.src = reader.result;
          }, false);

          if (file)
          {
            return reader.readAsDataURL(file);
          }
  };




};

//DataTable.prototype = Object.create(Library.prototype);

//This is the document ready that will create a new instance of DataTable
//HINT: Each class||object will need a new instance to be initalized on document ready!
// document.addEventListener("DOMContentLoaded", function(e){
//  window.gLibrary = new Library();
$(() => {
  window.gDataTable = new DataTable();
//  window.gDataTable.init();
});
