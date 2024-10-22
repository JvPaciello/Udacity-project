import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get } from "../BooksAPI"; // API call to get book details

function BookDetail() {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // Store book data
  const [loading, setLoading] = useState(true); // Loading state

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
    return <p>Loading book details...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="book-detail">
      <Link to="/" className="back-button">← Back to Home</Link>
      <h2>{book.title}</h2>
      <p><strong>Author(s):</strong> {book.authors?.join(", ")}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Published Date:</strong> {book.publishedDate}</p>
      <p><strong>Description:</strong> {book.description}</p>
      {book.imageLinks?.thumbnail && (
        <img src={book.imageLinks.thumbnail} alt={book.title} />
      )}
    </div>
  );
}

export default BookDetail;
