import { useState } from "react";
import { search } from "../BooksAPI";
import Book from "./Book"; // Correct import
import { Link } from "react-router-dom";

function SearchPage({ books, onMove }) {
  const [query, setQuery] = useState(""); // State for search query
  const [results, setResults] = useState([]); // State for search results

  // Handle user input in the search field
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      search(value, 20).then((res) => {
        setResults(res.error ? [] : res);
      });
    } else {
      setResults([]);
    }
  };

  // Get the current shelf of a book if it exists
  const getShelf = (book) => {
    const foundBook = books.find((b) => b.id === book.id);
    return foundBook ? foundBook.shelf : "none";
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-result">
        <ol className="books-grid">
          {results.map((book) => (
            <Book
              key={book.id}
              book={{ ...book, shelf: getShelf(book) }}
              onMove={onMove}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
