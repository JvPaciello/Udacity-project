import Book from "./Book";

function Bookshelf({ title, books, onMove, shelf }) {
  
  const handleDrop = (e) => {
    e.preventDefault(); 

    try {
      const bookData = e.dataTransfer.getData("application/json"); 
      const book = JSON.parse(bookData);

      if (book.shelf !== shelf) {
        onMove(book, shelf);
      }
    } catch (error) {
      console.error("Error parsing book data:", error);
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (
    <div 
      className="bookshelf"
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
    >
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
