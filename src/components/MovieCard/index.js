import React, { useEffect, useState } from 'react';
import {InfinitySpin} from 'react-loader-spinner';

const MovieCard = ({ movie }) => {
    const [dogImage, setDogImage] = useState('');
    const [request, setRequest] = useState(false);
    
    useEffect(() => {
        if(request) {
            const controller = new AbortController();
            const signal = controller.signal;
            
            const getDogImage = async () => {
                try {
                    const response = await fetch('https://dog.ceo/api/breeds/image/random', { signal } );
                    const data = await response.json();
                    setDogImage(data.message)   
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error(error);
                    }
                }
            };
            getDogImage();

            return () => {
                controller.abort();
            }
        }
        else{
            setRequest(true);
        }

    }, [request]);

    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            {dogImage? <img src={dogImage} alt="Random Dog" />
            :
            <InfinitySpin color='red' height="150" width="150" />}
            <p>{movie.author_name ? movie.author_name.join(', ') : 'Unknown Author'}</p>
            <p>{movie.first_publish_year}</p>
        </div>
    );
};

export default MovieCard;
