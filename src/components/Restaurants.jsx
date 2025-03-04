import React, { useState } from 'react';
import './Restaurants.css';
import { useNavigate } from 'react-router-dom';
import Image1 from '../assets/Images/restro1.jpg';
import Image2 from '../assets/Images/restro2.jpg';
import Image3 from '../assets/Images/restro3.jpg';
import Image4 from '../assets/Images/restro4.jpg';
import Image5 from '../assets/Images/restro5.jpg';
import Image6 from '../assets/Images/restro6.jpg';


export default function Restaurants() {
    const navigate = useNavigate();

    const handleReservation = (restaurant) => {
        // Send the selected restaurant data as state to the reservation page
        navigate('/reservation', { state: { restaurant } });
    };

    const [restaurantsData, setRestaurantsData] = useState([
        {
            id: 1,
            name: 'Restaurant 1',
            location: 'Location 1',
            image: Image1,
            tables: 10,
            price: "100",
            specification: { outdoor: true, indoor: true },
            reserver: "Yes",
            vacant: "5",
            reviews: [],
            timeslots: [
                { table: 1, time: '12:00 PM - 2:00 PM', available: true },
                { table: 1, time: '6:00 PM - 8:00 PM', available: true },
                { table: 2, time: '12:00 PM - 2:00 PM', available: false },
                { table: 2, time: '6:00 PM - 8:00 PM', available: true },
                { table: 3, time: '12:00 PM - 2:00 PM', available: true },
                { table: 3, time: '6:00 PM - 8:00 PM', available: false },
            ],
            menu: {
                burgers: { "Cheeseburger": 100, "Veg Burger": 80 },
                pizza: { "Margherita": 150, "Pepperoni": 180 },
                drinks: { "Water": 50, "Juice": 100, "Tea": 50 },
                dessert: { "Icecream": 100, "Cake": 150 },
                lunch: { "Burger": 100, "Chowmin": 150 }
            }
        },
        {
            id: 2,
            name: 'Restaurant 2',
            location: 'GLA Univesity, Mathua ',
            image: Image2,
            tables: 12,
            price: "150",
            specification: { outdoor: true, indoor: false },
            reserver: "No",
            vacant: "7",
            reviews: [],
            timeslots: [
                { table: 1, time: '1:00 PM - 3:00 PM', available: true },
                { table: 1, time: '7:00 PM - 9:00 PM', available: false },
                { table: 2, time: '1:00 PM - 3:00 PM', available: true },
                { table: 2, time: '7:00 PM - 9:00 PM', available: true },
                { table: 3, time: '1:00 PM - 3:00 PM', available: false },
                { table: 3, time: '7:00 PM - 9:00 PM', available: true },
            ],
            menu: {
                burgers: { "Chicken Burger": 120, "Fish Burger": 140 },
                pizza: { "Vegetable Pizza": 200, "BBQ Chicken": 250 },
                drinks: { "Soft Drink": 60, "Water": 50 },
                dessert: { "Pie": 130, "Brownie": 120 },
                lunch: { "Spaghetti": 180, "Sandwich": 90 }
            }
        },
        {
            id: 2,
            name: 'Restaurant 2',
            location: 'GLA Univesity, Mathua ',
            image: Image2,
            tables: 12,
            price: "150",
            specification: { outdoor: true, indoor: false },
            reserver: "No",
            vacant: "7",
            reviews: [],
            timeslots: [
                { table: 1, time: '1:00 PM - 3:00 PM', available: true },
                { table: 1, time: '7:00 PM - 9:00 PM', available: false },
                { table: 2, time: '1:00 PM - 3:00 PM', available: true },
                { table: 2, time: '7:00 PM - 9:00 PM', available: true },
                { table: 3, time: '1:00 PM - 3:00 PM', available: false },
                { table: 3, time: '7:00 PM - 9:00 PM', available: true },
            ],
            menu: {
                burgers: { "Chicken Burger": 120, "Fish Burger": 140 },
                pizza: { "Vegetable Pizza": 200, "BBQ Chicken": 250 },
                drinks: { "Soft Drink": 60, "Water": 50 },
                dessert: { "Pie": 130, "Brownie": 120 },
                lunch: { "Spaghetti": 180, "Sandwich": 90 }
            }
        },
        {
            id: 2,
            name: 'Restaurant 2',
            location: 'GLA Univesity, Mathua ',
            image: Image2,
            tables: 12,
            price: "150",
            specification: { outdoor: true, indoor: false },
            reserver: "No",
            vacant: "7",
            reviews: [],
            timeslots: [
                { table: 1, time: '1:00 PM - 3:00 PM', available: true },
                { table: 1, time: '7:00 PM - 9:00 PM', available: false },
                { table: 2, time: '1:00 PM - 3:00 PM', available: true },
                { table: 2, time: '7:00 PM - 9:00 PM', available: true },
                { table: 3, time: '1:00 PM - 3:00 PM', available: false },
                { table: 3, time: '7:00 PM - 9:00 PM', available: true },
            ],
            menu: {
                burgers: { "Chicken Burger": 120, "Fish Burger": 140 },
                pizza: { "Vegetable Pizza": 200, "BBQ Chicken": 250 },
                drinks: { "Soft Drink": 60, "Water": 50 },
                dessert: { "Pie": 130, "Brownie": 120 },
                lunch: { "Spaghetti": 180, "Sandwich": 90 }
            }
        },
        {
            id: 2,
            name: 'Restaurant 2',
            location: 'GLA Univesity, Mathua ',
            image: Image2,
            tables: 12,
            price: "150",
            specification: { outdoor: true, indoor: false },
            reserver: "No",
            vacant: "7",
            reviews: [],
            timeslots: [
                { table: 1, time: '1:00 PM - 3:00 PM', available: true },
                { table: 1, time: '7:00 PM - 9:00 PM', available: false },
                { table: 2, time: '1:00 PM - 3:00 PM', available: true },
                { table: 2, time: '7:00 PM - 9:00 PM', available: true },
                { table: 3, time: '1:00 PM - 3:00 PM', available: false },
                { table: 3, time: '7:00 PM - 9:00 PM', available: true },
            ],
            menu: {
                burgers: { "Chicken Burger": 120, "Fish Burger": 140 },
                pizza: { "Vegetable Pizza": 200, "BBQ Chicken": 250 },
                drinks: { "Soft Drink": 60, "Water": 50 },
                dessert: { "Pie": 130, "Brownie": 120 },
                lunch: { "Spaghetti": 180, "Sandwich": 90 }
            }
        },
        {
            id: 2,
            name: 'Restaurant 2',
            location: 'GLA Univesity, Mathua ',
            image: Image2,
            tables: 12,
            price: "150",
            specification: { outdoor: true, indoor: false },
            reserver: "No",
            vacant: "7",
            reviews: [],
            timeslots: [
                { table: 1, time: '1:00 PM - 3:00 PM', available: true },
                { table: 1, time: '7:00 PM - 9:00 PM', available: false },
                { table: 2, time: '1:00 PM - 3:00 PM', available: true },
                { table: 2, time: '7:00 PM - 9:00 PM', available: true },
                { table: 3, time: '1:00 PM - 3:00 PM', available: false },
                { table: 3, time: '7:00 PM - 9:00 PM', available: true },
            ],
            menu: {
                burgers: { "Chicken Burger": 120, "Fish Burger": 140 },
                pizza: { "Vegetable Pizza": 200, "BBQ Chicken": 250 },
                drinks: { "Soft Drink": 60, "Water": 50 },
                dessert: { "Pie": 130, "Brownie": 120 },
                lunch: { "Spaghetti": 180, "Sandwich": 90 }
            }
        }
    ]);

    return (
        <div className="restaurants-container">
            {restaurantsData.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.location}</p>
                    <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                    <div className="restaurant-info">
                        <p><strong>Price Range:</strong> ${restaurant.price}</p>
                        <p><strong>Available Tables:</strong> {restaurant.vacant} / {restaurant.tables}</p>
                    </div>
                    <button onClick={() => handleReservation(restaurant)}>Check Availability</button>
                </div>
            ))}
        </div>
    );
}
