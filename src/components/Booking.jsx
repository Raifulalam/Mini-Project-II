import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.error('No authentication token found');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/my-booking', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = response.data;
                setBookings(Array.isArray(data) ? data : data.bookings || []);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    return (
        <div className="bookings">
            <h3>My Bookings</h3>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="booking-card">
                            <div className="booking-header">
                                <span className="booking-restaurant">{booking?.restaurant || 'Restaurant'}</span>
                                <span className={`booking-status ${booking.status?.toLowerCase()}`}>
                                    {booking.status || 'Pending'}
                                </span>
                            </div>
                            <div className="booking-details">
                                <strong>Booking Date:</strong> {new Date(booking?.created_at).toLocaleDateString('en-US')}
                                <p><strong>Visit Date:</strong> {new Date(booking.visitdate).toLocaleDateString('en-US')}</p>
                                <p><strong>Time:</strong> {booking?.timeSlot || 'N/A'}</p>
                                <p><strong>Guests:</strong> {booking.guests?.length || 0}</p>
                                {booking.note && <p><strong>Note:</strong> {booking.note}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Booking;
