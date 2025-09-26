const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory "database"
let books = [];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST add new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// DELETE remove book
app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: 'Book deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
