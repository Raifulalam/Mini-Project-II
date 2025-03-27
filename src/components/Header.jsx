import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/Images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen); // Toggled menu open state
    };

    return (
        <div className="header">
            <nav className="navbar-top ">
                <Link className="navbar-brand" to="#">
                    <img src={logo} alt="logo" /> Book My Restro
                </Link>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">


                    <form className="form-inline my-2 my-lg-0 d-flex">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div className="sider">
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
                        <li className='nav-item'>
                            <Link className="nav-link" to="/login">Sign In</Link>

                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/signup">Sign Up</Link>

                        </li>
                    </ul>

                </nav>
                <button className={`navbar-toggler ${isMenuOpen ? 'open' : ''}`} type="button" onClick={handleMenuClick}>

                    <img className="navbar-toggler-icon" src={`../public/${isMenuOpen ? 'push.png' : 'pull.png'}`} alt="Push/pull" />


                </button>
            </div>

        </div>
    );
};

export default Header;
