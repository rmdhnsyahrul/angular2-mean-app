const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../config/database');

// Book schema
const BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    publisher: String,
    published_date: Date,
    price: Number,
    updated_at: {type: Date, default: Date.now}
})

const Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.getAllBooks = function(callback){
    Book.find({}, callback)
};
module.exports.findBookById = function(id, callback){
    Book.findById(id, callback);
};
module.exports.addNewBook = function(book, callback){
    Book.create(book, callback);
};
module.exports.updateBook = function(id, book, callback){
    Book.findByIdAndUpdate(id, book, callback);
};
module.exports.deleteBook = function(id, callback){
    Book.findByIdAndRemove(id, callback);
}