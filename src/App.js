import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import SearchPage from "./components/SearchPage";
import { get, getAll, update } from "./BooksAPI";
function App() {
  const [books, setBooks] = useState([]);

  //load the books when the app is initializated
  useEffect(() => {
    getAll().then((data) => setBooks(data));
  }, []);

  //function to move the books between shelves
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
