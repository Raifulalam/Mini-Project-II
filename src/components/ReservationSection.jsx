import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ReservationSection.css';


const ReservationSection = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedTimeslot, setSelectedTimeslot] = useState('');
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '', review: '', rating: 0 });
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    // Get restaurant data passed via location state
    const location = useLocation();
    const { restaurant } = location.state || {};  // Default to empty object if no state passed

    const handleTimeslotChange = (e) => {
        setSelectedTimeslot(e.target.value);
    };

    const handleTableSelection = (e) => {
        setSelectedTable(e.target.value);
        setSelectedTimeslot(''); // Clear timeslot when table changes
    };

    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmitReview = () => {
        // Validate review
        if (!userDetails.review || userDetails.rating === 0) {
            alert("Please provide both a rating and a comment.");
            return;
        }

        // Create a new review object
        const newReview = {
            rating: userDetails.rating,
            comment: userDetails.review,
            user: {
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone
            }
        };

        // Add this review to the restaurant's review array
        const updatedRestaurant = {
            ...restaurant,
            reviews: [...restaurant.reviews, newReview]
        };

        setSelectedRestaurant(updatedRestaurant); // Update the restaurant state with the new review
        setUserDetails({ name: '', email: '', phone: '', review: '', rating: 0 }); // Clear user details after submitting

        console.log("Review submitted:", newReview);
    };

    const confirmBooking = () => {
        // Validate form
        if (!userDetails.name || !userDetails.email || !userDetails.phone) {
            alert("Please fill in all user details.");
            return;
        }

        // Confirm the booking and mark the timeslot as unavailable
        const updatedRestaurants = restaurant.timeslots.map((slot) => {
            if (slot.table === parseInt(selectedTable) && slot.time === selectedTimeslot) {
                slot.available = false; // Mark this slot as unavailable
            }
            return slot;
        });
        setSelectedRestaurant({ ...restaurant, timeslots: updatedRestaurants });
        setBookingConfirmed(true);
        setSelectedTable('');
        setSelectedTimeslot('');
    };

    return (
        <div className="reservation-sections">
            <div className="reservation-container">
                {restaurant ? (
                    <div key={restaurant.id} className="restaurant-back">
                        {/* Restaurant Details Section */}
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.location}</p>
                        <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                        <div className="restaurant-info">
                            <p><strong>Price Range:</strong> ${restaurant.price}</p>
                            <p><strong>Available Tables:</strong> {restaurant.vacant} / {restaurant.tables}</p>
                        </div>
                    </div>
                ) : (
                    <p>Restaurant details not available.</p>
                )}

                {/* Availability Section */}
                <div className="availability-section">
                    <h3>Check Availability</h3>
                    <div>
                        <label>Select a Table:</label>
                        <select value={selectedTable} onChange={handleTableSelection} className="table-select">
                            <option value="">Select a Table</option>
                            {Array.from({ length: restaurant.tables }, (_, index) => (
                                <option key={index + 1} value={index + 1}>Table {index + 1}</option>
                            ))}
                        </select>
                    </div>

                    {selectedTable && (
                        <div>
                            <label>Select a Time Slot:</label>
                            <select value={selectedTimeslot} onChange={handleTimeslotChange} className="timeslot-select">
                                <option value="">Select a Time Slot</option>
                                {restaurant.timeslots.filter(slot => slot.table === parseInt(selectedTable) && slot.available).map((slot, index) => (
                                    <option key={index} value={slot.time}>{slot.time}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Booking Section */}
                    <div className="booking-section">
                        {selectedTable && selectedTimeslot && !bookingConfirmed && (
                            <div>
                                <h3>Booking Summary</h3>
                                <p><strong>Restaurant:</strong> {restaurant.name}</p>
                                <p><strong>Time Slot:</strong> {selectedTimeslot}</p>
                                <p><strong>Table:</strong> {selectedTable}</p>

                                <h4>Please Enter Your Details:</h4>
                                <form>
                                    <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleUserDetailsChange} />
                                    <input type="email" name="email" placeholder="Email Address" value={userDetails.email} onChange={handleUserDetailsChange} />
                                    <input type="tel" name="phone" placeholder="Phone Number" value={userDetails.phone} onChange={handleUserDetailsChange} />
                                </form>
                                <button className="btn btn-success" onClick={confirmBooking}>Confirm Booking</button>
                            </div>
                        )}

                        {bookingConfirmed && (
                            <div>
                                <h3>Your booking is confirmed!</h3>
                                <p>Your table has been reserved successfully.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>



            <div className="footer-section">
                {/* Review Section */}
                <div className="review-section">
                    <h2>Leave a Review</h2>
                    {restaurant && restaurant.reviews.length > 0 ? (
                        <div>
                            <h3>Customer Reviews</h3>
                            {restaurant.reviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <div className="review-rating">
                                        {Array.from({ length: review.rating }, (_, i) => (
                                            <span key={i} className="star">★</span>
                                        ))}
                                    </div>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet. Be the first to leave a review!</p>
                    )}

                    <textarea name="review" placeholder="Write your review..." value={userDetails.review} onChange={handleUserDetailsChange}></textarea>
                    <div className="review-rating">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <span key={rating} className={`star ${rating <= userDetails.rating ? 'filled' : ''}`} onClick={() => setUserDetails({ ...userDetails, rating })}>★</span>
                        ))}
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmitReview}>Submit Review</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationSection;
