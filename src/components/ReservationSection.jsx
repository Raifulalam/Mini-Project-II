import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ReservationSection.css';

const ReservationSection = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedTimeslot, setSelectedTimeslot] = useState('');
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        guest: 1,
        visitdate: '',
        timeSlot: '',
        restaurant: '',
        table: '',
        note: '',
        review: '',
        rating: 0,
    });
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const location = useLocation();
    const { restaurant } = location.state || {};

    // Handle Timeslot change
    const handleTimeslotChange = (e) => {
        setSelectedTimeslot(e.target.value);
    };

    // Handle table selection
    const handleTableSelection = (e) => {
        setSelectedTable(e.target.value);
        setSelectedTimeslot(''); // Reset time slot when table changes
    };

    // Handle user details input change
    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    // Handle reservation form submission
    const handleReservationSubmit = async (e) => {
        e.preventDefault();

        // Validate visit date
        const formattedVisitDate = new Date(userDetails.visitdate);
        if (isNaN(formattedVisitDate)) {
            alert('Invalid visit date. Please select a valid date.');
            return;
        }

        if (formattedVisitDate < new Date()) {
            alert('Visit date cannot be in the past. Please select a future date.');
            return;
        }

        // Submit the booking to the server
        try {
            const response = await fetch('http://localhost:3000/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    restaurantId: restaurant._id,
                    restaurant: restaurant.name,
                    table: selectedTable,
                    visitdate: formattedVisitDate.toISOString(),
                    timeSlot: selectedTimeslot,
                    guests: userDetails.guest,
                    note: userDetails.note,
                    name: userDetails.name,
                    email: userDetails.email,
                    phone: userDetails.phone,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create booking');
            }

            const responseData = await response.json();
            alert('Booking successfully created:', responseData.message);

            // Reset form on success
            setBookingConfirmed(true);
            resetForm();

        } catch (error) {
            console.error('Error creating booking:', error);
            alert(`Error creating booking: ${error.message}`);
        }
    };

    // Reset the user details form after successful booking
    const resetForm = () => {
        setSelectedTable('');
        setSelectedTimeslot('');
        setUserDetails({
            name: '',
            email: '',
            phone: '',
            guest: 1,
            visitdate: '',
            timeSlot: '',
            restaurant: '',
            table: '',
            note: '',
            review: '',
            rating: 0,
        });
    };

    // Handle review submission
    const handleSubmitReview = () => {
        if (!userDetails.review || userDetails.rating === 0) {
            alert('Please write a review and select a rating.');
            return;
        }

        // Simulate the review submission process
        console.log('Review Submitted:', userDetails.review, userDetails.rating);
        alert('Review submitted successfully!');
    };

    return (
        <div className="reservation-sections">
            <div className="reservation-container">
                {restaurant ? (
                    <div className="restaurant-back">
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

                <div className="availability-section">
                    <h3>Check Availability</h3>
                    <div>
                        <label>Select a Table:</label>
                        <select value={selectedTable} onChange={handleTableSelection}>
                            <option value="">Select a Table</option>
                            {Array.from({ length: restaurant.tables }, (_, index) => (
                                <option key={index + 1} value={index + 1}>Table {index + 1}</option>
                            ))}
                        </select>
                    </div>

                    {selectedTable && (
                        <div>
                            <label>Select a Time Slot:</label>
                            <select value={selectedTimeslot} onChange={handleTimeslotChange}>
                                <option value="">Select a Time Slot</option>
                                {restaurant.timeslots.filter(slot => slot.table === parseInt(selectedTable) && slot.available).map((slot, index) => (
                                    <option key={index} value={slot.time}>{slot.time}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedTable && selectedTimeslot && !bookingConfirmed && (
                        <div>
                            <h3>Booking Summary</h3>
                            <p><strong>Restaurant:</strong> {restaurant.name}</p>
                            <p><strong>Time Slot:</strong> {selectedTimeslot}</p>
                            <p><strong>Table:</strong> {selectedTable}</p>

                            <h4>Please Enter Your Details:</h4>
                            <form onSubmit={handleReservationSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={userDetails.name}
                                    onChange={handleUserDetailsChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={userDetails.email}
                                    onChange={handleUserDetailsChange}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={userDetails.phone}
                                    onChange={handleUserDetailsChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="guest"
                                    placeholder="Guest Number"
                                    value={userDetails.guest}
                                    onChange={handleUserDetailsChange}
                                    min="1"
                                    required
                                />
                                <br />
                                <input
                                    type="date"
                                    name="visitdate"
                                    value={userDetails.visitdate}
                                    onChange={handleUserDetailsChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="timeSlot"
                                    value={selectedTimeslot}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    name="restaurant"
                                    value={restaurant.name}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    name="table"
                                    value={selectedTable}
                                    readOnly
                                />
                                <textarea
                                    name="note"
                                    placeholder="Additional Notes"
                                    value={userDetails.note}
                                    onChange={handleUserDetailsChange}
                                />
                                <button type="submit">Submit Booking</button>
                            </form>
                        </div>
                    )}

                    {bookingConfirmed && (
                        <div>
                            <h3>Your booking is confirmed!</h3>
                            <p>Your table has been reserved successfully.</p>
                        </div>
                    )}
                </div>

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

                    <textarea
                        name="review"
                        placeholder="Write your review..."
                        value={userDetails.review}
                        onChange={handleUserDetailsChange}
                    />
                    <div className="review-rating">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <span
                                key={rating}
                                className={`star ${rating <= userDetails.rating ? 'filled' : ''}`}
                                onClick={() => setUserDetails({ ...userDetails, rating })}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <button onClick={handleSubmitReview}>Submit Review</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationSection;
