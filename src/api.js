export const fetchMovies = async (query) => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();
    data.docs.sort((a, b) => b.first_publish_year - a.first_publish_year);
    return data.docs.slice(0,20);
};

export const fetchDogImage = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
};
