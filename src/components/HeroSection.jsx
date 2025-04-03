import React from 'react';
import './HeroSection.css';
import Header from './Header';
import Restaurants from './Restaurants';
const HeroSection = () => {
    return (
        <div className="hero-section">
            <Header />
            <section className="hero">

                <div className="hero-content">
                    <h1>Welcome to Book My Restro</h1>
                    <p>Book your table at the best restaurants in town with just a few clicks.</p>
                    <a href="#reservation" className="cta-button">Make a Reservation</a>
                </div>


            </section>

            <Restaurants />
        </div>

    );
};

export default HeroSection;
