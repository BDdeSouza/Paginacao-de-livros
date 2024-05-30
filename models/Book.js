const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    pages: { type: Number, required: true },
    year: { type: Number, required: true },
    price: { type: String, required: true }
});

module.exports = mongoose.model('Book', BookSchema);
