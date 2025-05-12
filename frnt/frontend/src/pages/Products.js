import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleProductsCount, setVisibleProductsCount] = useState(8); 
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost/ecommerce2/public/api/categories', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost/ecommerce2/public/api/products', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
            } catch (err) {
                setError('Failed to fetch data. Please check your authentication.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const fetchProductsByCategory = async (categoryId) => {
        try {
            setLoading(true);
            const endpoint =
                categoryId === 'all'
                    ? 'http://localhost/ecommerce2/public/api/products'
                    : `http://localhost/ecommerce2/public/api/products/category/${categoryId}`;

            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data);
            setVisibleProductsCount(8); 
        } catch (err) {
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setVisibleProductsCount(prevCount => prevCount + 8);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">
               
                <div className="flex overflow-x-auto space-x-6 mb-10 pb-4 scrollbar-hide">
                    
                    <button
                        onClick={() => fetchProductsByCategory('all')}
                        className="flex flex-col items-center space-y-2 hover:text-orange-500 transition"
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9Z7TGE88EX9aWqG4VN78qMlbB-DBMh7VTLnMc0PZsNtKDb5f7mYtc5Kh4lX2naQOK6g&usqp=CAU"
                            alt="All Categories"
                            className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 hover:border-orange-500 transition"
                        />
                        <span className="text-sm font-medium mt-1">All</span>
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => fetchProductsByCategory(category.id)}
                            className="flex flex-col items-center space-y-2 hover:text-orange-500 transition"
                        >
                            <img
                                src={
                                    category.image.startsWith('http')
                                        ? category.image
                                        : `http://localhost/ecommerce2/storage/${category.image}`
                                }
                                alt={category.name}
                                className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 hover:border-orange-500 transition"
                            />
                            <span className="text-sm font-medium mt-1">{category.name}</span>
                        </button>
                    ))}
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.slice(0, visibleProductsCount).map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer group"
                            onClick={() => (window.location.href = `/ProductDetails/${product.id}`)}
                        >
                            <div className="relative">
                                <img
                                    src={product.image || 'https://via.placeholder.com/500'}
                                    alt={product.name}
                                    className="h-48 w-full object-cover transform group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                                <p className="text-sm text-gray-500 mb-2">{product.category?.name || 'Uncategorized'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-orange-600 font-bold text-lg">${product.price}</span>
                                    <button className="text-sm bg-orange-500 text-white py-1 px-3 rounded-full hover:bg-orange-600 transition">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                
                {visibleProductsCount < products.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleLoadMore}
                            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
