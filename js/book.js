/*Constructor for Book class - no methods yet*/
class Book {
   constructor(oArgs){
     this.cover = oArgs.cover;
     this.title = oArgs.title; //Required
     this.author = oArgs.author; //Required
     this.synopsis = oArgs.synopsis;
     this.numPages = oArgs.numPages; //Required
     this.pubDate = new Date(String(oArgs.pubDate)).getUTCFullYear(); //Required
     this.rating = oArgs.rating;
     return true;
  }
};


// Book.prototype.EditBook = function(oArgs){
//
//   make sure the info is unique too
//   get the properities in the oBook
//   var oBookProperties = oArgs;
//   for(var i = 0; i < oBookProperties.length; i++) {
//     if(this.indexOf(oBookProperties[i]) !== -1) {
//       oBookProperties[i] = undefined;
//     }
//  }
// };
// this.title = oBook.title || this.title;
// this.author = oBook.author || this.author;
// this.numPages = oBook.numPages || this.numPages;
// this.pubDate = oBook.pubDate || this.pubDate;
// this.rating = oBook.rating;
// return oBook;
// };
