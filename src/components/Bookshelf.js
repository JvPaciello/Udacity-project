import Book from "./components/Book";

function Bookshelf({ title, books, onMove }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} onMove={onMove} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Bookshelf;
