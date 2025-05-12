import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost/ecommerce2/public/api/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setUsers(res.data);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (id, role) => {
        setLoading(true);
        try {
            await axios.put(
                `http://localhost/ecommerce2/public/api/users/${id}/role`,
                { role },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setSuccessMessage('Role updated successfully!');
            fetchUsers(); 
        } catch (err) {
            setError('Failed to update role');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Manage Users</h1>

          
            {successMessage && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {successMessage}
                    </div>
                </div>
            )}
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                    <div className="flex items-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <select
                                        value={user.role}
                                        onChange={(e) => updateRole(user.id, e.target.value)}
                                        className="border border-gray-300 rounded-lg py-1 px-2 focus:ring focus:ring-blue-300"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
            {loading && (
                <div className="flex justify-center items-center mt-4">
                    <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
