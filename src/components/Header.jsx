import React, { useState, useContext } from 'react';
import './Header.css';
import logo from '../assets/Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="header">
            <nav className="navbar-top">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" /> Book My Restro
                </Link>

                <div className="avatar">
                    {user && (
                        <Link to={`/profile/${user.id}`}>
                            <img src={user.avatar || '/boy.png'} alt={user?.name || 'Profile'} className="avatar" />
                        </Link>

                    )}
                    <span className="badge">
                        Hey {user?.name ? user.name.split(" ")[0] : 'Guest'}
                    </span>
                </div>

                <button className="navbar-toggler" type="button" onClick={handleMenuClick}>
                    <span className="navbar-toggler-icon">
                        <hr />
                        <hr />
                        <hr />
                    </span>
                </button>
            </nav>

            <nav className={`navbar-nav ${isMenuOpen ? 'open' : ''}`} id="nav-element" aria-hidden={!isMenuOpen}>
                {user ? (
                    <ul className="navbar">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/menu">Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/restaurants">Reservation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>

                    </ul>
                ) : (
                    <ul className="navbar">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Header;
