import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    if (!order) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">Order Details</h1>
                    <p className="text-gray-600">No order details available.</p>
                    <button
                        onClick={() => navigate('/orders')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Back to Order History
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Order Details</h1>
                <p className="text-gray-600 mb-2">
                    <strong>Order ID:</strong> {order.id}
                </p>
                <p className="text-black-600 mb-2">
                    <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-black-600 mb-4">
                    <strong>Status:</strong> {order.status}
                </p>
                <h2 className="text-xl font-bold text-black-700 mb-4">Items:</h2>
                <ul className="space-y-3 mb-6">
                    {order.items.map((item) => (
                        <li
                            key={item.id}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded border"
                        >
                            <span className="text-black-700 font-medium">{item.product.name}</span>
                            <span className="text-black-500">Quantity: {item.quantity}</span>
                            <span className="text-black-700 font-semibold">
                                ${item.product.price * item.quantity}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="text-gray-700 text-lg font-bold">
                    <strong>Total:</strong> $
                    {order.items.reduce(
                        (total, item) => total + item.product.price * item.quantity,
                        0
                    )}
                </p>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/orders')}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        Back to Order History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;