import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import SearchPage from "./components/SearchPage";
import BookDetail from "./components/BookDetail"; 
import { getAll, update } from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  // Fetch books from the API and update state
  const fetchBooks = async () => {
    const data = await getAll();
    setBooks(data);
  };

  // Load books from the API when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to move books between shelves and update the state
  const moveBook = (book, shelf) => {
    if (book.shelf !== shelf) {
      update(book, shelf).then(() => {
        // Update the book locally in the state for immediate feedback
        setBooks((prevBooks) => {
          const updatedBooks = prevBooks.filter((b) => b.id !== book.id);
          return [...updatedBooks, { ...book, shelf }];
        });
      });
    }
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <Bookshelf
                    title="Currently Reading"
                    books={books.filter((book) => book.shelf === "currentlyReading")}
                    onMove={moveBook}
                    shelf="currentlyReading"
                  />
                  <Bookshelf
                    title="Want to Read"
                    books={books.filter((book) => book.shelf === "wantToRead")}
                    onMove={moveBook}
                    shelf="wantToRead"
                  />
                  <Bookshelf
                    title="Read"
                    books={books.filter((book) => book.shelf === "read")}
                    onMove={moveBook}
                    shelf="read"
                  />
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            }
          />
          <Route 
            path="/search" 
            element={<SearchPage books={books} onMove={moveBook} />} 
          />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
