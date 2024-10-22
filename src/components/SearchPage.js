import{useState} from "react";
import { search } from "../BooksAPI";
import Book from "./book";
import { Link } from "react-router-dom";

function SearchPage({books,onMove}){
    const[query,setQuery]= useState("");
    const[results,setResults]=useState([]);

    const handleSearch= (e) =>{
        const value= e.target.value;
        setQuery(value);

        if (value){
            search(value,20).then((res)=>{
                setResults(res.error?[]:res);
            });
        }else{
            setResults([]);
        }
        }
    };
    const getShelf = (book)=>{
        const foundBook= books.find((b)=> b.id === book.id);
        return foundBook ? foundBook.shelf: "none";
    };

    return(
        <div className="search -books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">close</Link>
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
                    {
                    results.map((book)=>(
                        <Book
                        key={book.id}
                        book={{...book, shelf: getShelf(book)}}
                        onMove={onMove}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );

    export default SearchPage;