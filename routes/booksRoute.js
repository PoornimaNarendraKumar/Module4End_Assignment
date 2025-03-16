const express = require('express');
const router = express.Router()
const books = require('../books');

router.get('/', (req, res) => {
    try {
        res.status(200).json(books);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ error: "Books not found" })
    }
})
router.get('/:id', (req, res) => {
    try {
        const bookID = parseInt(req.params.id);
        console.log(bookID);
        const book = books.find(prod => prod.id === bookID)
        if (!book) {
            return res.status(404).json({ error: "Book not found" })
        }
        res.status(200).json(book);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
})

// add a book

router.post('/', (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: "Title,Author and year are required" })
            const { title, author, year } = req.body;
        if (!title || !author || !year) return res.status(400).json({ message: "Title,Author and year are required" })
        const newBook = {
            id: books.length ? books[books.length - 1].id + 1 : 1,
            title: title,
            author: author,
            year: year
        }
        books.push(newBook)
        res.status(201).json({ message: "New Book added", book: newBook })

    }
    catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
})

//update product
router.patch('/:id', (req, res) => {
    try {
        const bookID = parseInt(req.params.id)
        console.log(bookID);
        const book = books.find(book => book.id === bookID)
        if (!book) {
            return res.status(404).json({ error: "Book not available" })
        }
        if (!req.body) return res.status(400).json({ message: "Title,Author and year are required" })
        const { title,author,year} = req.body;
        if (title !== undefined) book.title = title
        if (author !== undefined) book.author = author
        if (year !== undefined) book.year = year
        
        res.status(200).json(book)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
})

//delete product
router.delete('/:id', (req, res) => {
    try {
        const bookID = parseInt(req.params.id)
        const bookIndex = books.findIndex(book => book.id === bookID)
        if (bookIndex == -1) {
            return res.status(404).json({ error: "Books not found" })
        }
        const deletedBooks = books.splice(bookIndex, 1)
        res.status(200).json({ message: "Book Deleted Successfully", book: deletedBooks })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }

})


module.exports = router