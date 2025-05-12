import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', image: null, imageUrl: '' });
    const [editCategory, setEditCategory] = useState(null); // State to track category being edited
    const { token } = useContext(AuthContext);

    // Fetch all categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost/ecommerce2/public/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (err) {
                setError('Failed to fetch categories.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newCategory.name);

        if (newCategory.image) {
            formData.append('image', newCategory.image);
        } else if (newCategory.imageUrl) {
            formData.append('image_url', newCategory.imageUrl);
        }

        try {
            const response = await axios.post('http://localhost/ecommerce2/public/api/categories', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setCategories([...categories, response.data.category]);
            setNewCategory({ name: '', image: null, imageUrl: '' });
            alert('Category added successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to add category.');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', editCategory.name);

        if (editCategory.image) {
            formData.append('image', editCategory.image);
        } else if (editCategory.imageUrl) {
            formData.append('image_url', editCategory.imageUrl);
        }

        try {
            await axios.put(`http://localhost/ecommerce2/public/api/categories/${editCategory.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            
            setCategories(categories.map((cat) => (cat.id === editCategory.id ? editCategory : cat)));
            setEditCategory(null);
            alert('Category updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to update category.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`http://localhost/ecommerce2/public/api/categories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

               
                setCategories(categories.filter((cat) => cat.id !== id));
                alert('Category deleted successfully!');
            } catch (err) {
                console.error(err);
                alert('Failed to delete category.');
            }
        }
    };

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>

            {/* Add/Edit Form */}
            <form onSubmit={editCategory ? handleEditSubmit : handleSubmit} className="bg-white p-4 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">{editCategory ? 'Edit Category' : 'Add New Category'}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        value={editCategory ? editCategory.name : newCategory.name}
                        onChange={(e) =>
                            editCategory
                                ? setEditCategory({ ...editCategory, name: e.target.value })
                                : setNewCategory({ ...newCategory, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Image (Upload File)</label>
                    <input
                        type="file"
                        onChange={(e) =>
                            editCategory
                                ? setEditCategory({ ...editCategory, image: e.target.files[0], imageUrl: '' })
                                : setNewCategory({ ...newCategory, image: e.target.files[0], imageUrl: '' })
                        }
                        className="w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Image URL (Optional)</label>
                    <input
                        type="url"
                        value={editCategory ? editCategory.imageUrl : newCategory.imageUrl}
                        onChange={(e) =>
                            editCategory
                                ? setEditCategory({ ...editCategory, imageUrl: e.target.value, image: null })
                                : setNewCategory({ ...newCategory, imageUrl: e.target.value, image: null })
                        }
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter image URL"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    {editCategory ? 'Update Category' : 'Add Category'}
                </button>
                {editCategory && (
                    <button
                        type="button"
                        onClick={() => setEditCategory(null)}
                        className="ml-4 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Category List */}
            <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="border px-4 py-2">{category.name}</td>
                            <td className="border px-4 py-2">
                                {category.image ? (
                                    <img
                                        src={
                                            category.image.startsWith('http')
                                                ? category.image
                                                : `http://localhost/ecommerce2/storage/${category.image}`
                                        }
                                        alt={category.name}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => setEditCategory(category)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryManagement;