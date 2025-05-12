import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost/ecommerce2/public/api/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id, token]);

    const handleAddToCart = async (productId) => {
        try {
            await axios.post(
                'http://localhost/ecommerce2/public/api/cart',
                { product_id: productId, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Product added to cart successfully!');
        } catch (err) {
            console.error('Failed to add to cart:', err);
            alert('Failed to add product to cart.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-medium">
                Loading product...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-xl font-semibold">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="bg-gray-100 p-6 flex justify-center items-center">
                        <img
                            src={product.image || 'https://via.placeholder.com/500'}
                            alt={product.name}
                            className="rounded-xl object-cover max-h-[450px]"
                        />
                    </div>

                    
                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg mb-6">
                                {product.description || 'No description available.'}
                            </p>

                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full">
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full">
                                    Category: {product.category?.name || 'Uncategorized'}
                                </span>
                            </div>

                            <p className="text-3xl font-semibold text-green-600 mb-4">
                                ${product.price}
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col md:flex-row gap-4">
                            <button
                                onClick={() => handleAddToCart(product.id)}
                                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;