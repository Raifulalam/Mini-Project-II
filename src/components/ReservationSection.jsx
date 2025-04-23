import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReservationSection.css';
import { UserContext } from './userContext';
import './EsewaPaymentForm.css';
const ReservationSection = () => {
    const location = useLocation();
    const { restaurant } = location.state || {};
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedTimeslot, setSelectedTimeslot] = useState('');
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const token = localStorage.getItem('authToken');
    const [reviewers, setReviewers] = useState([]);
    const [isPaying, setIsPaying] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        guest: '',
        visitdate: '',
        timeSlot: '',
        restaurant: '',
        table: '',
        note: '',
        review: '',
        rating: 0,
        userId: user?.id,
        restaurantId: restaurant._id,
        title: user?.name,


    });

    useEffect(() => {
        if (restaurant) {
            localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
            setSelectedRestaurant(restaurant);
        } else {
            const savedRestaurant = localStorage.getItem('selectedRestaurant');
            if (savedRestaurant) {
                setSelectedRestaurant(JSON.parse(savedRestaurant));
            }
        }
    }, [restaurant]);
    useEffect(() => {
        if (!selectedRestaurant?._id) return; // Prevent fetching if ID is not available

        fetch(`http://localhost:3000/api/reviews/${selectedRestaurant._id}`)
            .then(res => res.json())
            .then(data => setReviewers(data))
            .catch(error => console.error('Error fetching review data:', error));
    }, [selectedRestaurant?._id]); // Add dependency here


    const handleTimeslotChange = (e) => {
        setSelectedTimeslot(e.target.value);
    };

    const handleTableSelection = (e) => {
        setSelectedTable(e.target.value);
        setSelectedTimeslot('');
    };

    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        const formattedVisitDate = new Date(userDetails.visitdate);
        if (isNaN(formattedVisitDate)) {
            alert('Invalid visit date. Please select a valid date.');
            return;
        }
        if (formattedVisitDate < new Date()) {
            alert('Visit date cannot be in the past.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Use JWT from local storage
                },

                body: JSON.stringify({
                    restaurantId: selectedRestaurant._id,
                    restaurant: selectedRestaurant.name,
                    table: selectedTable,
                    visitdate: formattedVisitDate.toISOString(),
                    timeSlot: selectedTimeslot,
                    guests: userDetails.guest,
                    note: userDetails.note,
                    name: userDetails.name,
                    email: userDetails.email,
                    phone: userDetails.phone,
                    userId: user.id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create booking');
            }

            const responseData = await response.json();
            alert('Booking successfully created: ' + responseData.message);
            setBookingConfirmed(true);
            resetForm();

        } catch (error) {
            console.error('Error creating booking:', error);
            alert(`Please login to Book your table`);
        }
    };



    const handleSubmitReview = async () => {
        if (!userDetails.review || userDetails.rating === 0) {
            alert('Please write a review and select a rating.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: userDetails.title,
                    userId: userDetails.userId,
                    restaurantId: selectedRestaurant._id,
                    comment: userDetails.review,
                    rating: userDetails.rating,
                }),
            });
            if (!response.ok) throw new Error('Failed to submit review');
            alert('Review submitted successfully!');
            setUserDetails({ ...userDetails, review: '', rating: 0 });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    const handlePaymentClick = () => {
        setIsPaying(true);
        navigate('/payment', {
            state: {
                restaurant: selectedRestaurant,
                userDetails,
                selectedTable,
                selectedTimeslot,
                amount: selectedRestaurant.price * userDetails.guest,
            },
        });
    };
    return (
        <div className="reservation-sections">
            <div className="reservation-container">
                {selectedRestaurant ? (
                    <div className="restaurant-back">
                        <h3>{selectedRestaurant.name}</h3>
                        <p>{selectedRestaurant.location}</p>
                        <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="restaurant-image" />
                        <div className="restaurant-info">
                            <p><strong>Price Range:</strong> ${selectedRestaurant.price}</p>
                            <p><strong>Available Tables:</strong> {selectedRestaurant.vacant} / {selectedRestaurant.tables}</p>
                        </div>
                    </div>
                ) : (
                    <p>Restaurant details not available.</p>
                )}

                <div className="availability-section">
                    <h3>Check Availability</h3>
                    <label>Select a Table:</label>
                    <select value={selectedTable} onChange={handleTableSelection}>
                        <option value="">Select a Table</option>
                        {selectedRestaurant && Array.from({ length: selectedRestaurant.tables }, (_, index) => (
                            <option key={index + 1} value={index + 1}>Table {index + 1}</option>
                        ))}
                    </select>

                    {selectedTable && (
                        <>
                            <label>Select a Time Slot:</label>
                            <select value={selectedTimeslot} onChange={handleTimeslotChange}>
                                <option value="">Select a Time Slot</option>
                                {selectedRestaurant && selectedRestaurant.timeslots
                                    .filter(slot => slot.table === parseInt(selectedTable) && slot.available)
                                    .map((slot, index) => (
                                        <option key={index} value={slot.time}>{slot.time}</option>
                                    ))}
                            </select>
                        </>
                    )}

                    {selectedTable && selectedTimeslot && !bookingConfirmed && (
                        <form onSubmit={handleReservationSubmit}>
                            <h3>Booking Summary</h3>
                            <p><strong>Restaurant:</strong> {selectedRestaurant.name}</p>
                            <p><strong>Time Slot:</strong> {selectedTimeslot}</p>
                            <p><strong>Table:</strong> {selectedTable}</p>

                            <h4>Please Enter Your Details:</h4>

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleUserDetailsChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleUserDetailsChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" placeholder="Phone Number" value={userDetails.phone} onChange={handleUserDetailsChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="guest">No. of Guests</label>
                                <input type="number" id="guest" name="guest" placeholder="Guest Number" value={userDetails.guest} onChange={handleUserDetailsChange} min="1" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="visitdate">Visiting Date</label>
                                <input type="date" id="visitdate" name="visitdate" value={userDetails.visitdate} onChange={handleUserDetailsChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="timeSlot">Time Slot</label>
                                <input type="text" id="timeSlot" name="timeSlot" value={selectedTimeslot} readOnly />
                            </div>

                            <div className="form-group">
                                <label htmlFor="restaurant">Restaurant</label>
                                <input type="text" id="restaurant" name="restaurant" value={selectedRestaurant.name} readOnly />
                            </div>

                            <div className="form-group">
                                <label htmlFor="table">Table</label>
                                <input type="text" id="table" name="table" value={selectedTable} readOnly />
                            </div>

                            <div className="form-group">
                                <label htmlFor="note">Additional Notes</label>
                                <textarea id="note" name="note" placeholder="Additional Notes" value={userDetails.note} onChange={handleUserDetailsChange} />
                            </div>

                            <button type="submit" >Submit Booking</button>
                        </form>

                    )}

                    {bookingConfirmed && (
                        <div>
                            <div className="confirmation-box">
                                <h3>Your booking is confirmed! 🎉</h3>
                                <p>Your table has been reserved successfully.</p>
                                <button type="button" onClick={handlePaymentClick} disabled={isPaying}>
                                    {isPaying ? 'Redirecting...' : 'Pay Now'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="review-section">
                    <h2 className="section-title">Customer Reviews</h2>

                    {/* Show existing reviews */}
                    {reviewers && reviewers.length > 0 ? (
                        reviewers.map((review, index) => (
                            <div key={index} className="review-card">

                                <div className="review-date">
                                    <strong>{review.title || 'Anonymous'}</strong>
                                    <p className='review-date-p'>{new Date(review.created_at).toLocaleString()}</p>
                                </div>
                                <div className="review-header">
                                    <p className="review-comment">{review.comment}</p>
                                    <div className="review-stars">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to leave one!</p>
                    )}


                </div>
                {/* Review form */}
                <div className="review-form">
                    <h3>Leave a Review</h3>

                    <textarea
                        name="review"
                        placeholder="Write your review..."
                        value={userDetails.review}
                        onChange={handleUserDetailsChange}
                        className="review-textarea"
                    />

                    <div className="review-rating-input">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <span
                                key={rating}
                                className={`star ${rating <= userDetails.rating ? 'filled' : ''}`}
                                onClick={() => setUserDetails({ ...userDetails, rating })}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <button className="submit-review-btn" onClick={handleSubmitReview}>
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationSection;
