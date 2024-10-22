import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get } from "../BooksAPI"; // API call to get book details

function BookDetail() {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // Store book data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch book details on component mount
  useEffect(() => {
    get(id)
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="loading">Loading book details...</p>;
  }

  if (!book) {
    return <p className="not-found">Book not found.</p>;
  }

  return (
    <div className="book-detail">
      <div className="book-detail-header">
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>

      <div className="book-detail-content">
        <div className="book-detail-cover">
          {book.imageLinks?.thumbnail && (
            <img src={book.imageLinks.thumbnail} alt={book.title} />
          )}
        </div>

        <div className="book-detail-info">
          <h1>{book.title}</h1>
          <p><strong>Author(s):</strong> {book.authors?.join(", ")}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Published Date:</strong> {book.publishedDate}</p>
          <p><strong>Description:</strong> {book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
