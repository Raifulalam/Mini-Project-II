import React, { useState } from 'react';
import './Restaurants.css';
import Image1 from '../assets/Images/restro1.jpg';
import Image2 from '../assets/Images/restro2.jpg';
import Image3 from '../assets/Images/restro3.jpg';
import Image4 from '../assets/Images/restro4.jpg';
import Image5 from '../assets/Images/restro5.jpg';
import Image6 from '../assets/Images/restro6.jpg';

export default function Restaurants() {
    // Sample data for the restaurants
    const RestaurantsData = [
        { id: 1, name: 'Restaurant 1', location: 'Location 1', image: Image1 },
        { id: 2, name: 'Restaurant 2', location: 'Location 2', image: Image2 },
        { id: 3, name: 'Restaurant 3', location: 'Location 3', image: Image3 },
        { id: 4, name: 'Restaurant 4', location: 'Location 4', image: Image4 },
        { id: 5, name: 'Restaurant 5', location: 'Location 5', image: Image5 },
        { id: 6, name: 'Restaurant 6', location: 'Location 6', image: Image6 },
    ];

    // State for error handling
    const [error, setError] = useState(null);

    // You can handle filtering or dynamic data here if needed
    const [displayRestaurants, setDisplayRestaurants] = useState(RestaurantsData);

    return (
        <div className="restaurants-container">
            {displayRestaurants.length > 0 ? (
                displayRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant-card">
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.location}</p>
                        <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                    </div>
                ))
            ) : (
                <p>No restaurants found.</p>
            )}

            {error && <p className="error-message">{error}</p>}
        </div>
    );
}
