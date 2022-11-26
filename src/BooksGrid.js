// import components
import Book from "./Book.js";

const BooksGrid = ({ books, onBookChange, allBooks }) => {
  return (
    <ol className="books-grid">
      {books.map((book) => {
        return (
          <Book key={book.id} onBookChange={onBookChange} book={book}></Book>
        );
      })}
    </ol>
  );
};

export default BooksGrid;
