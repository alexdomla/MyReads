import "./App.css";
import { useEffect, useState } from "react";
// BrowserRouter as Router means we can use the BrowserRouter with the name of Router.
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import API methods
//import { get, getAll, update, search } from "./BooksAPI";
import * as BooksAPI from "./BooksAPI";

// import components
import Bookshelf from "./Bookshelf";
import BooksGrid from "./BooksGrid";

function App() {
  /*const [showSearchPage, setShowSearchpage] = useState(false);*/

  //states

  // all books state
  let [allBooks, setAllBooks] = useState([]);
  // search books state
  let [searchBooks, setSearchBooks] = useState([]);
  // query state
  let [query, setQuery] = useState("");

  // "shelf" unique values. We could improve the program if map this array and render a bookshelf component for each item in the array.
  const bookshelves = ["currentlyReading", "wantToRead", "read"];

  // get all books on first render and store them in state
  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setAllBooks(data);
    });
  }, []);

  // get searchBooks on query change and store then in state
  // use async await as it is asynchronous
  // check if there are any errors and update the searchBooks state only if there are no errors.
  // Error 1: it is firing on page render, without searching for anything
  // Error 2: typing fast leads to error because it should be async?
  // Error 3: handling error for empty query // also check if multiple-Word query works.
  // query state
  let [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      console.log({ query });
      BooksAPI.search(query).then((data) => console.log(data));
    }
  }, [query]);

  // function for changing book's shelf
  const updateBookshelf = (book, shelf) => {
    const updatedBooks = allBooks.map((b) => {
      if (b.id === book.id) {
        book.shelf = shelf;
        return book;
      }
      return b;
    });
    setAllBooks(updatedBooks);
    BooksAPI.update(book, shelf);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf
                    title="Currently Reading"
                    books={allBooks.filter(
                      (book) => book.shelf === "currentlyReading"
                    )}
                    //shelf={bookshelves[0]}
                    onBookChange={updateBookshelf}
                    allBooks={allBooks}
                  />
                  <Bookshelf
                    title="Want To Read"
                    books={allBooks.filter(
                      (book) => book.shelf === "wantToRead"
                    )}
                    //shelf={bookshelves[1]}
                    onBookChange={updateBookshelf}
                    allBooks={allBooks}
                  />
                  <Bookshelf
                    title="Read"
                    books={allBooks.filter((book) => book.shelf === "read")}
                    //shelf={bookshelves[2]}
                    onBookChange={updateBookshelf}
                    allBooks={allBooks}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          </div>
        }
      ></Route>
      <Route
        path="/search"
        element={
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN"
                  value={query}
                  onChange={
                    (e) => setQuery(e.target.value) // we want a useEffect that reacts on query changes, so that an API call is done to get the books corresponding to the search.
                  }
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <BooksGrid
                  books={searchBooks}
                  onBookChange={updateBookshelf}
                  allBooks={allBooks}
                ></BooksGrid>
              </ol>
            </div>
          </div>
        }
      ></Route>
    </Routes>
  );
}

export default App;
