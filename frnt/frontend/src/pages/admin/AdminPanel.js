import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-700 mb-8">Admin Panel</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                    onClick={() => navigate('/ManageUsers')}
                    className="px-6 py-4 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition shadow-md hover:shadow-lg"
                >
                    Manage Users
                </button>
                <button
                    onClick={() => navigate('/ManageProducts')}
                    className="px-6 py-4 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition shadow-md hover:shadow-lg"
                >
                    Manage Products
                </button>
                <button
                    onClick={() => navigate('/ManageCategories')}
                    className="px-6 py-4 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition shadow-md hover:shadow-lg"
                >
                    Manage Categories
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;