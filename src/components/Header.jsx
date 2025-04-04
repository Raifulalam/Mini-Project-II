import React, { useState, useContext } from 'react';
import './Header.css';
import logo from '../assets/Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './userContext'; // Import UserContext

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useContext(UserContext); // Access user state and setUser method from context

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);  // Toggle the menu open/close state
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');  // Clear the auth token from localStorage
        setUser(null);  // Clear user data from context
        navigate('/login');  // Navigate to the home page after logout
    };

    return (
        <div className="header">
            <nav className="navbar-top">
                <Link className="navbar-brand" to="#">
                    <img src={logo} alt="logo" /> Book My Restro
                </Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0 d-flex">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
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
                {user ? (  // Check if there is a user (logged in)
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
                            <Link className="nav-link" to="#">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar">
                        <li className='nav-item'>
                            <Link className="nav-link" to="/login">Sign In</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Header;
