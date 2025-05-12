import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            
            await axios.post('http://localhost/ecommerce2/public/api/logout', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

           
            logout();

           
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
            alert('Failed to log out. Please try again.');
        }
    };

    
    React.useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;