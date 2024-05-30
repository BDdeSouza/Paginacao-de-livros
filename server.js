const express = require('express');
const mongoose = require('./db');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/books', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    try {
        const totalBooks = await Book.countDocuments();
        const books = await Book.find().skip(startIndex).limit(limit);

        res.json({
            page,
            limit,
            totalBooks,
            books
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
