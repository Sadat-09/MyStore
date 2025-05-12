import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [form, setForm] = useState({ name: '', price: '', description: '', stock: '', image: '', category_id: '' });
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost/ecommerce2/public/api/products', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost/ecommerce2/public/api/categories', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCategories(response.data);
    };

    const handleImageUpload = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'Ecommmerce');

        const response = await axios.post('https://api.cloudinary.com/v1_1/dep26iwhn/image/upload', formData);
        return response.data.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = form.image;
        if (imageFile) {
            imageUrl = await handleImageUpload();
        }
        

        const url = editId
            ? `http://localhost/ecommerce2/public/api/products/${editId}`
            : 'http://localhost/ecommerce2/public/api/products';
        const method = editId ? 'put' : 'post';

        await axios[method](url, { ...form, image: imageUrl }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        fetchProducts();
        setForm({ name: '', price: '', description: '', stock: '', image: '', category_id: '' });
        setImageFile(null);
        setEditId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await axios.delete(`http://localhost/ecommerce2/public/api/products/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchProducts();
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditId(product.id);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Product Management</h1>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">{editId ? 'Update Product' : 'Add New Product'}</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="input"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            required
                            className="input"
                        />
                        <textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="input md:col-span-2"
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            className="input"
                        />
                        <input
                            type="url"
                            placeholder="Image URL (optional)"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                            className="input"
                        />
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="input md:col-span-2"
                        />
                        
                        <select
                            value={form.category_id}
                            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                            required
                            className="input"
                        >
                            <option value="" disabled>
                                Select a Category
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition"
                        >
                            {editId ? 'Update' : 'Add'} Product
                        </button>
                    </form>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                        >
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-600 font-bold">${product.price}</span>
                                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                                </div>
                                <div className="flex mt-4 space-x-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="flex-1 py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="flex-1 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;