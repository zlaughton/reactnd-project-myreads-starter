import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        query: '',
        showingBooks: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    
    clearQuery = () => {
        this.setState({ query: '' })
    }

    updateSearchResults = (query) => {
        BooksAPI.search(query).then((results) => {
            this.setState({ showingBooks: results })
        })
    }
    
    render() {
        const { changeShelf } = this.props
        const { showingBooks } = this.state

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={(event) => this.updateSearchResults(event.target.value)}
                />
           
              </div>
              
            </div>
            <div className="search-books-results">
            <ol className='books-grid'>
                {showingBooks !== undefined && showingBooks.length > 0 && (showingBooks.map((book, index) => (
                    <li key={index}>
                        <Book book={ book } changeShelf={ changeShelf }/>
                    </li>
                )))}
              </ol>
            </div>
          </div>
        )
    }
}

export default Search