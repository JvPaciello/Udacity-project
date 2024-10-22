import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import SearchPage from "./components/SearchPage";
import { getAll, update } from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]); // State to store books

  // Load books from the API when the component mounts
  useEffect(() => {
    getAll().then((data) => setBooks(data));
  }, []);

  // Function to move books between shelves and update the state
  const moveBook = (book, shelf) => {
    update(book, shelf).then(() => {
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? { ...b, shelf } : b))
      );
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Main page displaying bookshelves */}
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
                  />
                  <Bookshelf
                    title="Want to Read"
                    books={books.filter((book) => book.shelf === "wantToRead")}
                    onMove={moveBook}
                  />
                  <Bookshelf
                    title="Read"
                    books={books.filter((book) => book.shelf === "read")}
                    onMove={moveBook}
                  />
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            }
          />
          {/* Search page */}
          <Route
            path="/search"
            element={<SearchPage books={books} onMove={moveBook} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
