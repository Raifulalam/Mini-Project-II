import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './Restaurants.css';
import chef1 from '../assets/Images/chef-reading-book.jpg';
import Serverimge from '../assets/Images/Signup.jpg';

export default function HomePage() {
    const navigate = useNavigate();

    const [restaurantsData, setRestaurantsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch restaurants data
    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await fetch('https://mini-project-ii-6.onrender.com/api/restaurants');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setRestaurantsData(data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchRestaurantData();  // Fetch data when component mounts
    }, []);




    const handleViewMore = () => {
        navigate('/restaurants', { state: { restaurants: restaurantsData } });  // Pass all restaurants data to the restaurants page
    };

    const limitedRestaurants = restaurantsData.slice(0, 4);  // Display only the first 4 restaurants initially

    // Handle reservation action (you need to define this function)
    const handleReservation = (restaurant) => {
        // Navigate to a reservation page (e.g., passing restaurant data as state)
        navigate('/reservation', { state: { restaurant } });
    };

    return (
        <div className="home-page">
            <Header />

            <div className="home-container">
                <div className="right-container">
                    <div className="image-container">
                        {/* Optional: Add a home page illustration image */}
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
                    <button className="book-now-btn" onClick={handleViewMore}>Book Now</button>
                </div>


            </div>


            <div><h1>Featured Restaurants:</h1></div>
            <div className="restaurants-container">

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    // Map over the limited restaurants
                    limitedRestaurants.map((restaurant) => (
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
                )}
                <button className="view-more-btn" onClick={handleViewMore}>
                    View More
                </button>
            </div>
            <div className="app-info">
                <section className="about-hero">
                    <h1>About Our Restaurant</h1>
                    <p>
                        Welcome to our reservation system – where delicious moments begin! We blend modern convenience with traditional hospitality to ensure your dining experience is seamless from booking to billing.
                    </p>
                    <ul>
                        <li>✔ Easy and fast online reservations</li>
                        <li>✔ Reliable payment system with eSewa</li>
                        <li>✔ Detailed booking history and reminders</li>
                        <li>✔ Friendly support and personalized experience</li>
                    </ul>
                </section>

                <div className="signup-image">


                    <img src={Serverimge} alt="Serve Image" />

                </div>
            </div>

            <Footer />
        </div>
    );
}
