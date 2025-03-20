import React from 'react';
import { useLocation } from 'react-router-dom';
import './Restaurants.css';
import Header from './Header';
import Image1 from '../assets/Images/chowmine.jpg';  // Default image import
import { useNavigate } from 'react-router-dom';

const RestaurantsPage = () => {
    const location = useLocation();
    const { restaurants } = location.state || {};  // Get the restaurant data passed from the HomePage
    const navigate = useNavigate();

    if (!restaurants) {
        return <div>No restaurants found.</div>;
    }

    const handleReservation = (restaurant) => {
        // Passing the selected restaurant only to the reservation page
        navigate('/reservation', { state: { restaurant } });
    }

    return (
        <div>
            <Header />
            <h1>Book Your Restaurant</h1>
            <div className="restaurants-container">
                {restaurants.length > 0 ? (
                    restaurants.map((restaurant) => (
                        <div key={restaurant._id} className="restaurant-card">
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.location}</p>
                            <img
                                src={restaurant.image || Image1} // Fallback to default image if no image provided
                                alt={restaurant.name}
                                className="restaurant-image"
                            />
                            <div className="restaurant-info">
                                <p><strong>Price Range:</strong> {restaurant.price}</p>
                                <p><strong>Available Tables:</strong> {restaurant.vacant} / {restaurant.tables}</p>
                            </div>
                            {/* Add the "Check Availability" button */}
                            <button onClick={() => handleReservation(restaurant)}>
                                Check Availability
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No restaurants available.</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantsPage;
