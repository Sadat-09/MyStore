import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Order Confirmation</h1>
                    <p className="text-gray-600 mb-6">No order details available.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to Products
                    </button>
                </div>
            </div>
        );
    }

    const totalAmount = order.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
                    🎉 Thank You for Your Order!
                </h1>
                <p className="text-center text-gray-700 mb-8">
                    We’ve received your order and are processing it now.
                </p>

                <div className="mb-6">
                    <p className="text-lg font-medium text-gray-800">
                        <span className="font-semibold">Order ID:</span> {order.id}
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                        <span className="font-semibold">Status:</span> {order.status}
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                <ul className="space-y-4 mb-6">
                    {order.items.map((item) => (
                        <li
                            key={item.id}
                            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                        >
                            <div>
                                <p className="text-gray-800 font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-600">
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-800 font-semibold">
                                    ${(item.product.price * item.quantity)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ${item.product.price} each
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="text-right text-xl font-bold text-gray-900 mb-6">
                    Total: ${totalAmount}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
