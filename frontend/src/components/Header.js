import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img 
                    src="https://sdmntprwestus.oaiusercontent.com/files/00000000-9ac0-6230-b164-6447d5218d80/raw?se=2025-05-10T12%3A56%3A46Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=e9d2f8b1-028a-4cff-8eb1-d0e66fbefcca&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T10%3A24%3A00Z&ske=2025-05-11T10%3A24%3A00Z&sks=b&skv=2024-08-04&sig=dDe1ddPAvemVPy0GB82miKdu6ASAffb10ylIO8RDhPE%3D" 
                    alt="" 
                    style={styles.logoImage} 
                    onClick={() => navigate('/')}
                />
            </div>
            
           {user && ( 
            <div style={styles.searchBarContainer}>
                <SearchBar />
            </div>
              )}

            <nav style={styles.nav}>
                <ul style={styles.navList}>
                    {user && (
                        <>
                            <li style={styles.navItem}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3225/3225209.png"
                                    alt="Cart"
                                    style={styles.cartImage}
                                    onClick={() => navigate('/cart')} />
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/orders" style={styles.profileButton}>
                                    Order History
                                </Link>
                            </li>
                        </>
                    )}
                    <li style={styles.navItem}>
                        <Link to="/">Products</Link>
                    </li>
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <li style={styles.navItem}>
                                    <Link to="/admin" style={styles.adminButton}>
                                        AdminPanel
                                    </Link>
                                </li>
                            )}
                            <li style={styles.navItem}>
                                <Link to="/profile" style={styles.profileButton}>
                                    Profile
                                </Link>
                                
                            </li>
                            <li style={styles.navItem}>
                                <button onClick={handleLogout} style={styles.logoutButton}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li style={styles.navItem}>
                                <Link to="/login">Login</Link>
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/register">Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

const styles = {
    header: { 
        padding: '10px', 
        borderBottom: '1px solid #ccc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'orange',
         
    },
    logoContainer: { 
        display: 'flex', 
        alignItems: 'center', 
        cursor: 'pointer',
        width: '200px',
        height: '50px',
    },
    logoImage: { 
        width: '200px', 
        height: '55px', 
        objectFit: 'cover', 
        cursor: 'pointer',
        marginLeft: '15px'
    },
    searchBarContainer: { 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    cartImage: { 
        width: '40px', 
        height: '40px', 
        cursor: 'pointer', 
        marginRight: '15px' 
    },
    nav: { 
        display: 'flex', 
        justifyContent: 'flex-end' 
    },
    navList: { 
        display: 'flex', 
        listStyleType: 'none', 
        margin: 0, 
        padding: 0 
    },
    navItem: { 
        marginLeft: '15px', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        fontSize: '16px', 
    },
    logoutButton: { 
        background: 'none', 
        border: 'none', 
        color: 'white', 
        cursor: 'pointer',
        fontSize: '16px', 
    },
    adminButton: { 
        color: 'green', 
        textDecoration: 'none',
        fontSize: '16px', 
    },
    profileButton: { 
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px', 
    },
};

export default Header;
