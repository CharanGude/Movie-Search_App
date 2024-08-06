import React, { useEffect, useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    
    useEffect(() => {
        onSearch(query.trim().toLowerCase());
    }, [query,onSearch])

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim().toLowerCase());
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for a movie..."
                    required
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
