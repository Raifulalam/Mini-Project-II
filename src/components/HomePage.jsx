import React from 'react';
import './HomePage.css';
import poster from '../assets/Images/homepage-image.jpg';
import Header from './Header';
import Footer from './Footer';
import Restaurants from './Restaurants';

export default function HomePage() {
    return (
        <div className="home-page">
            <Header />

            <div className="home-container">


                <div className="right-container">
                    <div className="image-container">
                        {/* <img src={poster} alt="Restaurant Reservation Illustration" /> */}
                    </div>
                </div>
                <div className="left-container">
                    <h1>Welcome to Book My Restro</h1>
                    <p className="tagline">Your Ultimate Dining Experience, Just a Click Away</p>
                    <div className="left-info">
                        <p>
                            Book a table at any time, from anywhere. Simply select your preferred restaurant, choose the date
                            and time, and confirm your reservation. It's that easy!
                        </p>
                    </div>
                    <button className="book-now-btn">Book Now</button>
                </div>
            </div>
            <Restaurants />
            <Footer />
        </div>
    );
}
