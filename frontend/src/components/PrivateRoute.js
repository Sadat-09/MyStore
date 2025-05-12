import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user, token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" />; 
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" />; 
    }

    return children;
};

export default PrivateRoute;