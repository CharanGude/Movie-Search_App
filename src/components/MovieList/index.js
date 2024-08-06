import React from 'react';
import MovieCard from '../MovieCard';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">

            {movies.length > 0? movies.map((movie) => (
                <MovieCard key={movie.key} movie={movie} />
            )) : <h1>No Data to Show Here</h1>}
        </div>
    );
};

export default MovieList;
