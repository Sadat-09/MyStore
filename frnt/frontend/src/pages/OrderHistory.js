import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost/ecommerce2/public/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                navigate('/login'); 
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const handleViewOrderDetails = (order) => {
        navigate(`/order-details/${order.id}`, { state: { order } }); 
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">{error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600">
                You have no past orders.
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Order History</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                    >
                        <p className="text-sm text-black-500"><strong>Order ID:</strong> {order.id}</p>
                        <p className="text-sm text-black-500">
                            <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-black-500"><strong>Status:</strong> {order.status}</p>
                        <p className="text-sm text-black-500">
                            <strong>Total:</strong> $
                            {order.items.reduce(
                                (total, item) => total + item.product.price * item.quantity,
                                0
                            )}
                        </p>
                        <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-gray-600 transition focus:outline-none"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;