import { Link } from "react-router-dom";

function Book({ book, onMove }) {
  const thumbnail = book.imageLinks?.thumbnail || "";
  
  // Function to check if the book is already on a shelf or not
  const isOnShelf = book.shelf && book.shelf !== "none";

  
  return (
    <div className="book">
      <div className="book-top">
        <Link to={`/book/${book.id}`} title="Book details">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}
          ></div>
        </Link>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"}
            onChange={(e) => onMove(book, e.target.value)}
          >
            {/* Display "Add to..." if not on a shelf, otherwise "Move to..." */}
            <option value="none" disabled>
              {isOnShelf ? "Move to..." : "Add to..."}
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
    </div>
  );
}

export default Book;
