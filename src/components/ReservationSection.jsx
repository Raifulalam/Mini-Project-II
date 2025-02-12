import React, { useState } from 'react';
import './ReservationSection.css';

const ReservationSection = () => {
    // Initialize form data state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Display the form data (in a real app, send it to a backend or API)
        console.log(formData);
        alert('Reservation submitted!');
    };

    return (
        <section className="reservation" id="reservation">
            <h2>Make a Reservation</h2>
            <form onSubmit={handleSubmit} className="reservation-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="guests"
                    placeholder="Number of Guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="reserve-btn">Reserve Now</button>
            </form>
        </section>
    );
};

export default ReservationSection;
