import React, { useState } from 'react';
import {FidgetSpinner} from 'react-loader-spinner';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { fetchMovies } from './api';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); 

    const handleSearch = async (query) => {
        setLoading(true);
        setMovies([])
        setError('');
        try {
            const results = await fetchMovies(query);
            setMovies(results);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch movies');
        }
        setLoading(false);
    };

    return (
        <div className="App">
            <SearchBar onSearch={handleSearch} />
            <div className='movies-list-body'>
              {loading?
              <div className="movies-loader-container">
                <FidgetSpinner height="150" width="150" />
                <h1>Fetching...</h1>
              </div>
              :
              <>
                {!error && 
                  <div>
                    <h1>Discover Your Next Favorite Film - Fast, Fun, and Effortless Movie Search</h1> 
                  </div>
                }
              </>
              }
              {error && 
              <>
                <h1>We are Sorry...</h1>
                <p>{error}</p>
              </>}
              {movies && <MovieList movies={movies} /> }
            </div>
        </div>
    );
};

export default App;