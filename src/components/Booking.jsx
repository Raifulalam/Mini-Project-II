import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
import axios from 'axios';
import './UserProfile.css';

const UserBooking = () => {
    const { user, setUser } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3000/api/my-booking', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data;
                const bookingsArray = Array.isArray(data) ? data : data.bookings || [];
                setBookings(bookingsArray);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                setBookings([]);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);


    if (!user) {
        return <div className="user-profile__no-user">No user found. Please log in.</div>;
    }

    return (
        <div className="user-profile">


            {/* Section: My Bookings */}
            <section className="profile-section">
                <h3 className="section-title">My Bookings</h3>
                {bookings.length === 0 ? (
                    <p className="no-data">No bookings found.</p>
                ) : (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="booking-card">
                                <div className="booking-header">
                                    <span className="booking-restaurant">{booking?.restaurant || 'Restaurant'}</span>
                                    <span className={`booking-status ${booking.status?.toLowerCase()}`}>
                                        {booking.status || 'Pendin'}
                                    </span>
                                </div>
                                <div className="booking-details">
                                    <strong>Booking Date:</strong> {new Date(booking?.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) || 'Date'}
                                    <p><strong>Visit Date:</strong> {new Date(booking.visitdate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) || 'Date'}</p>


                                    <p><strong>Time:</strong> {booking?.timeSlot || 'N/A'}</p>
                                    <p><strong>Guests:</strong> {booking.guests?.length || 0}</p>
                                    {booking.note && <p><strong>Note:</strong> {booking.note}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default UserBooking;
