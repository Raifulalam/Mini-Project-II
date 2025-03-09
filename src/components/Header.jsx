import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/Images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Fixed setter function name
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen); // Toggled menu open state
    };

    return (
        <div className="header">
            <nav className="navbar-top ">
                <Link className="navbar-brand" to="#">
                    <img src={logo} alt="logo" /> Book My Restro
                </Link>
                <button className={`navbar-toggler ${isMenuOpen ? 'open' : ''}`} type="button" onClick={handleMenuClick}>
                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">


                    <form className="form-inline my-2 my-lg-0 d-flex">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <nav className={`navbar-nav ${isMenuOpen ? 'open' : ''}`} id="nav-element" aria-hidden={!isMenuOpen}>
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
                </ul>
            </nav>
        </div>
    );
};

export default Header;
