import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const shelves = [
  { id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading" },
  { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
  { id: "3", shelfName: "read", shelfDisplayName: "Read" },
  { id: "4", shelfName: "none", shelfDisplayName: "None" },
]

function Book({ book, onMove }) {
  const thumbnail = book.imageLinks?.thumbnail || ""; // Use book thumbnail or fallback to an empty string

  // Check if the book is already on a shelf
  const isOnShelf = book.shelf && book.shelf !== "none";

  // Handle the drag start event, storing the book data in the drag event's dataTransfer
  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(book));

    const img = new Image();
    img.src = thumbnail;
    img.style.width = "128px";
    img.style.height = "193px";




    e.dataTransfer.setDragImage(img, 64, 96);
  };

  return (
    <div
      className="book"
      draggable="true" // Enable dragging of this element
      onDragStart={handleDragStart} // Trigger drag start event
    >
      <div className="book-top">
        {/* Link to book details page */}
        <Link to={`/book/${book.id}`} title="Book details">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`,
            }}
          ></div>
        </Link>

        {/* Dropdown for changing the book's shelf */}
        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"} // Set the current shelf value
            onChange={(e) => onMove(book, e.target.value)} // Handle shelf change
          >
            {/* Display "Add to..." or "Move to..." based on book's presence on a shelf */}
            <option value="none" disabled>
              {isOnShelf ? "Move to..." : "Add to..."}
            </option>
            {shelves.map((shelf) => (
              <option key={shelf.id} value={shelf.shelfName}>
                {shelf.shelfDisplayName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display book title and authors */}
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
    </div>
  );
}
Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string,
  }).isRequired,
  onMove: PropTypes.func.isRequired,
};
export default Book;
