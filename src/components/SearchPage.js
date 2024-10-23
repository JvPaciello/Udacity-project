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
        if (res.error) {
          setResults([]);
        } else {
          const updatedResults = res.map((book) => {
            const foundBook = books.find((b) => b.id === book.id);
            return { ...book, shelf: foundBook ? foundBook.shelf : "none" };
          });
          setResults(updatedResults);
          console.log(updatedResults);
        }
      });
    } else {
      setResults([]);
    }
  };

  // Function called when a user move a book
  const handleMove = (book, shelf) => {
    onMove(book, shelf);
    setResults((prevResults) =>
      prevResults.map((b) =>
        b.id === book.id ? { ...b, shelf } : b
      )
    );

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
              book={book} // Já contém o shelf atualizado
              onMove={handleMove}
            />
          ))}
        </ol>

      </div>
    </div>
  );
}

export default SearchPage;
