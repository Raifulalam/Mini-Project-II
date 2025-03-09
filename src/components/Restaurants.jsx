import React from 'react';
import { useLocation } from 'react-router-dom';
import './Restaurants.css';

const RestaurantsPage = () => {
    const location = useLocation();
    const { restaurants } = location.state || {};  // Get the restaurant data passed from the HomePage

    if (!restaurants) {
        return <div>No restaurants found.</div>;
    }

    return (
        <div className="restaurants-container">
            {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                    <div key={restaurant._id} className="restaurant-card">
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.location}</p>
                        <img
                            src={restaurant.image || '/path/to/default-image.jpg'} // Provide a default image
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
    );
};

export default RestaurantsPage;
