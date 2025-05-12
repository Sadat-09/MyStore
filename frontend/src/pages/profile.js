import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { token } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost/ecommerce2/public/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-lg font-semibold">
                Loading...
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    👤 Your Profile
                </h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <p className="mt-1 text-gray-900 font-semibold">{profile?.name}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <p className="mt-1 text-gray-900 font-semibold">{profile?.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <p className="mt-1 text-gray-900 font-semibold">********</p>
                        <p className="text-xs text-gray-500">For security reasons, the password is hidden.</p>
                    </div>

                    <button
                        onClick={() => (window.location.href = 'update-password')}
                        className="w-full mt-6 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
