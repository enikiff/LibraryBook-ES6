/*Constructor for Book class - no methods yet*/
class Book {
   constructor(oArgs){
  this.cover = oArgs.cover;
  this.title = oArgs.title; //Required
  this.author = oArgs.author; //Required
  this.synopsis = oArgs.synopsis;
  this.numberOfPages = oArgs.numberOfPages; //Required
  this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear(); //Required
  this.rating = oArgs.rating;
  return false;
};
};

// Book.prototype.EditBook = function(oBook){
//
//   //make sure the info is unique too
//   //get the properities in the oBook
//   // var oBookProperties = oBook;
//   // for(var i = 0; i < oBookProperties.length; i++) {
//   //   if(this.indexOf(oBookProperties[i]) !== -1) {
//   //     oBookProperties[i] = undefined;
//   //   }
//   // }
// this.title = oBook.title || this.title;
// this.author = oBook.author || this.author;
// this.numPages = oBook.numPages || this.numPages;
// this.pubDate = oBook.pubDate || this.pubDate;
// this.rating = oBook.rating;
// return oBook;
// };
