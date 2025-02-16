import React, { useState } from 'react';
import './Restaurants.css';
import Image1 from '../assets/Images/restro1.jpg';
import Image2 from '../assets/Images/restro2.jpg';
import Image3 from '../assets/Images/restro3.jpg';
import Image4 from '../assets/Images/restro4.jpg';
import Image5 from '../assets/Images/restro5.jpg';
import Image6 from '../assets/Images/restro6.jpg';
import Menu from './Menu'; // Import the Menu component

export default function Restaurants() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedTimeslot, setSelectedTimeslot] = useState('');
    const [selectedTable, setSelectedTable] = useState('');
    const [currentView, setCurrentView] = useState('availability'); // Track which section is shown

    const RestaurantsData = [
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
            location: 'Location 2',
            image: Image2,
            tables: 12,
            price: "150",
            specification: { outdoor: true, indoor: false },
            reserver: "No",
            vacant: "7",
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
    ];

    const openMenuModal = (restaurant, view) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
        setCurrentView(view); // Open modal with the correct view (menu or availability)
    };

    const closeMenuModal = () => {
        setIsModalOpen(false);
        setSelectedRestaurant(null);
        setCurrentView('availability');
    };

    const handleTimeslotChange = (e) => {
        setSelectedTimeslot(e.target.value);
        const selectedSlot = selectedRestaurant.timeslots.find(
            (slot) => slot.time === e.target.value && slot.table === parseInt(selectedTable)
        );
        if (selectedSlot) {
            // Optionally reset selected table or do any other logic
        }
    };

    const handleTableSelection = (e) => {
        setSelectedTable(e.target.value);
        setSelectedTimeslot(''); // Reset timeslot selection on table change
    };

    return (
        <div className="restaurants-container">
            {RestaurantsData.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.location}</p>
                    <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                    <div className="restaurant-info">
                        <p><strong>Price Range:</strong> ${restaurant.price}</p>
                        <p><strong>Available Tables:</strong> {restaurant.vacant} / {restaurant.tables}</p>
                        {/* Buttons for Menu and Availability */}
                        <div className="button-group">
                            <button
                                className="btn btn-primary"
                                onClick={() => openMenuModal(restaurant, 'menu')}
                            >
                                View Menu
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => openMenuModal(restaurant, 'availability')}
                            >
                                Check Availability
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal for Menu and Availability */}
            {isModalOpen && selectedRestaurant && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedRestaurant.name} {currentView === 'menu' ? 'Menu' : 'Availability'}</h2>
                            <button className="close-btn" onClick={closeMenuModal}>X</button>
                        </div>

                        {/* Buttons for Availability, Menu, and Booking */}
                        <div className="button-group">
                            <button
                                className={`btn ${currentView === 'availability' ? 'active' : ''}`}
                                onClick={() => setCurrentView('availability')}
                            >
                                Availability
                            </button>

                            <button
                                className={`btn ${currentView === 'booking' ? 'active' : ''}`}
                                onClick={() => setCurrentView('booking')}
                            >
                                Booking
                            </button>
                        </div>

                        {/* Show the selected section based on currentView */}
                        {currentView === 'availability' && (
                            <div className="timeslot-section">
                                <h4>Select a Table:</h4>
                                <select
                                    value={selectedTable}
                                    onChange={handleTableSelection}
                                    className="table-select"
                                >
                                    <option value="">Select a Table</option>
                                    {Array.from({ length: selectedRestaurant.tables }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            Table {index + 1}
                                        </option>
                                    ))}
                                </select>

                                {selectedTable && (
                                    <div>
                                        <h4>Available Time Slots for Table {selectedTable}:</h4>
                                        <select
                                            value={selectedTimeslot}
                                            onChange={handleTimeslotChange}
                                            className="timeslot-select"
                                        >
                                            <option value="">Select a Time Slot</option>
                                            {selectedRestaurant.timeslots
                                                .filter((slot) => slot.table === parseInt(selectedTable) && slot.available)
                                                .map((slot, index) => (
                                                    <option key={index} value={slot.time}>
                                                        {slot.time}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        )}

                        {currentView === 'menu' && (
                            <div>
                                <h3>Menu</h3>
                                <Menu menu={selectedRestaurant.menu} />
                            </div>
                        )}

                        {currentView === 'booking' && (
                            <div>
                                <h3>Booking Summary</h3>
                                <p><strong>Restaurant:</strong> {selectedRestaurant.name}</p>
                                <p><strong>Time Slot:</strong> {selectedTimeslot}</p>
                                <p><strong>Table:</strong> {selectedTable}</p>
                                <button className="btn btn-success">Confirm Booking</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
