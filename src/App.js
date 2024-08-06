import React, { useEffect, useState } from 'react';
import {FidgetSpinner} from 'react-loader-spinner';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {

    const [apiStatus, setApiStatus] = useState({status:"INITIAL",movies:[],error:null});
    const [search,setSearch] = useState('');
    const [request,setRequest] = useState(false)

    useEffect(() => {
      if (request) {
          const controller = new AbortController();
          const signal = controller.signal;

          const fetchMovies = async (query) => {
              try {
                  const response = await fetch(`https://openlibrary.org/search.json?q=${query}`, { signal });
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  data.docs.sort((a, b) => b.first_publish_year - a.first_publish_year);
                  setApiStatus({
                      status: "SUCCESS",
                      movies: data.docs.slice(0, 20),
                      error: null
                  });
              } catch (error) {
                  if (error.name !== 'AbortError') {
                      console.error(error);
                      setApiStatus({
                          status: "FAILURE",
                          movies: [],
                          error: 'Failed to fetch movies'
                      });
                  }
              }
          };

          setApiStatus({
              status: "IN PROGRESS",
              movies: [],
              error: null
          });

          if(search === '') {
            setApiStatus(({status:"INITIAL",movies:[],error:null}));
          }else{
            fetchMovies(search);
          }

          return () => {
              controller.abort();
          };
      }
  }, [search, request]);

    const handleSearch = (query) => {
        console.log(query)
        setSearch(query);
        setRequest(true);
    };

    return (
        <div className="App">
          <SearchBar onSearch={handleSearch} />
          <div className='movies-list-body'>

            {apiStatus.status === "INITIAL" &&
              <div>
                <h1>Discover Your Next Favorite Film - Fast, Fun, and Effortless Movie Search</h1> 
              </div>
            }

            {apiStatus.status === "IN PROGRESS" && 
              <div className="movies-loader-container">
                <FidgetSpinner height="150" width="150" />
                <h1>Fetching...</h1>
              </div>
            }

            {apiStatus.status === "SUCCESS" && 
              <MovieList movies={apiStatus.movies} />
            }

            {apiStatus.status === "FAILURE" &&
              <div>
                <h1>We are Sorry...</h1>
                <p>{apiStatus.error}</p>
              </div>
            }
          </div>
        </div>
    );
};

export default App;