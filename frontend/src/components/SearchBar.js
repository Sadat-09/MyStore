import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            navigate(`/search?q=${query}`);
        }
    };

    const fetchSuggestions = async (searchTerm) => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost/ecommerce2/public/api/products/autocomplete?q=${searchTerm}`);
            setSuggestions(response.data);
        } catch (err) {
            console.error('Failed to fetch suggestions:', err);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSuggestionClick = (product) => {
        navigate(`/ProductDetails/${product.id}`);
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <form
                onSubmit={handleSearch}
                className="flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm focus-within:shadow-md transition-all duration-300 overflow-hidden"
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 bg-transparent"
                />
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold transition-all duration-300"
                >
                    Search 

                </button>
            </form>

            {suggestions.length > 0 && (
                <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-50">
                    {suggestions.map((product) => (
                        <li
                            key={product.id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all"
                            onClick={() => handleSuggestionClick(product)}
                        >
                            <img
                                src={product.image || 'https://via.placeholder.com/50'}
                                alt={product.name}
                                className="h-10 w-10 object-cover rounded-full"
                            />
                            <span className="text-gray-700">{product.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
