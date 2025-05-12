import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const UpdatePassword = () => {
    const { token } = useContext(AuthContext); 
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost/ecommerce2/public/api/change-password',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            setSuccess(response.data.message); 
            setFormData({
                current_password: '',
                new_password: '',
                new_password_confirmation: '',
            }); 
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors);
            } else if (err.response && err.response.data.error) {
                setError({ general: err.response.data.error });
            } else {
                setError({ general: 'An unexpected error occurred. Please try again later.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Update Password</h1>
                {success && <div className="text-green-600 mb-4">{success}</div>}
                {error && (
                    <div className="text-red-600 mb-4">
                        {Object.values(error).map((err, index) => (
                            <p key={index}>{err}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Current Password</label>
                        <input
                            type="password"
                            name="current_password"
                            value={formData.current_password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="new_password_confirmation"
                            value={formData.new_password_confirmation}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg focus:outline-none ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;