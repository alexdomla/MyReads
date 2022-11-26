import BooksGrid from "./BooksGrid";

const Bookshelf = ({ title, books, /*shelf,*/ onBookChange, allBooks }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={books}
          //shelf={shelf}
          onBookChange={onBookChange}
          allBooks={allBooks}
        ></BooksGrid>
      </div>
    </div>
  );
};

export default Bookshelf;
