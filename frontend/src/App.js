import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import PrivateRoute from './components/PrivateRoute';
import ManageUsers from './pages/admin/ManageUsers';
import AdminPanel from './pages/admin/AdminPanel';
import ManageProducts from './pages/admin/ManageProducts';
import Logout from './pages/Logout';
import Header from './components/Header';
import Profile from './pages/profile';
import UpdatePassword from './pages/UpdatePassword';
import ProductDetails from './pages/ProductDetails';
import CategoryManagement from './pages/admin/CategoryManagement';
import SearchResults from './pages/SearchResults';






const App = () => {
    return (
        <Router>

            <Header />
            

            <Routes>
                
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <AdminPanel />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ManageCategories"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <CategoryManagement />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ManageUsers"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <ManageUsers />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ManageProducts"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <ManageProducts />
                        </PrivateRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/order-details/:id" element={<OrderDetails />} />
                <Route path="/logout" element={<Logout />} />


                
                <Route
                    path="/"
                    element={
                        // <PrivateRoute>
                            <Products />
                        //</PrivateRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/update-password"
                    element={
                        <PrivateRoute>
                            <UpdatePassword />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ProductDetails/:id" 
                    element={
                        <PrivateRoute>
                            <ProductDetails />
                       </PrivateRoute>
                    }
                />
                 <Route path="/search" element={<SearchResults />} />

            </Routes>

        </Router>
    );
};

export default App;