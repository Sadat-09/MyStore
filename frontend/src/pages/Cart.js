import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost/ecommerce2/public/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(response.data.items || []);
            } catch (err) {
                setError('Failed to fetch cart items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [token]);

    const handleRemove = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost/ecommerce2/public/api/cart/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(cartItems.filter((item) => item.id !== cartItemId));
            alert('Item removed from cart.');
        } catch (err) {
            console.error('Failed to remove item from cart:', err.response ? err.response.data : err.message);
            alert('Failed to remove item. Please try again.');
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post(
                'http://localhost/ecommerce2/public/api/checkout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Checkout successful!');
            setCartItems([]);
            navigate('/order-confirmation', { state: { order: response.data.order } });
        } catch (err) {
            console.error('Failed to checkout:', err.response ? err.response.data : err.message);
            alert('Checkout failed. Please try again.');
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-lg font-semibold text-orange-500 animate-pulse">
                Loading your cart...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">
                {error}
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-lg font-medium text-gray-600">
                <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Your cart is empty.
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛒 Your Shopping Cart</h1>

                <ul className="space-y-6 mb-8">
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 overflow-hidden rounded-md shadow-sm">
                                    <img
                                        src={item.product.image || 'https://via.placeholder.com/150'}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">{item.product.name}</h2>
                                    <p className="text-gray-600 text-sm">Price: ${item.product.price}</p>
                                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-800 font-semibold">
                                    Total: ${ (item.product.price * item.quantity).toFixed(2) }
                                </p>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm focus:outline-none transition duration-150 ease-in-out"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
                        <span>Total:</span>
                        <span>${calculateTotalPrice()}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold focus:outline-none transition duration-150 ease-in-out"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;