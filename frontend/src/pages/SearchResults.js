import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q'); // Extract query from URL

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost/ecommerce2/public/api/products/search?q=${query}`);
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch search results.');
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchSearchResults();
    }, [query]);

    if (loading) {
        return <p className="text-center py-10">Loading search results...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 py-10">{error}</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
                        onClick={() => (window.location.href = `/ProductDetails/${product.id}`)}
                    >
                        <img
                            src={product.image || 'https://via.placeholder.com/500'}
                            alt={product.name}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
                            <span className="inline-block bg-green-100 text-blue-800 px-3 py-1 text-sm rounded-full mb-2">
                                {product.category?.name || 'Uncategorized'}
                            </span>
                            <p className="text-orange-600 font-bold text-md mb-4">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;