import React, { useEffect, useState } from 'react';
import {InfinitySpin} from 'react-loader-spinner';
import { fetchDogImage } from '../../api';

const MovieCard = ({ movie }) => {
    const [dogImage, setDogImage] = useState('');

    const getDogImage = async () => {
        const image = await fetchDogImage();
        setDogImage(image);
    };

    useEffect(() => {
        getDogImage();
    }, []);

    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            {dogImage? <img src={dogImage} alt="Random Dog" />
            :
            <InfinitySpin color='red' height="100" width="100" />}
            <p>{movie.author_name ? movie.author_name.join(', ') : 'Unknown Author'}</p>
            <p>{movie.first_publish_year}</p>
        </div>
    );
};

export default MovieCard;
