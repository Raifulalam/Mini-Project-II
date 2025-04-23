import React, { useState } from 'react';
import './ContactPage.css'; // Optional CSS file for styling

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can post this to your backend endpoint
        console.log('Form Data Submitted:', formData);
        setSubmitted(true);
        // Reset form (optional)
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>We’re here to help with your reservations and questions.</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <h2>Our Restaurant</h2>
                    <p><strong>Address:</strong> 123 Food Street Gla University, Mathura, India</p>
                    <p><strong>Phone:</strong> +91-9876543210</p>
                    <p><strong>Email:</strong> info@bookmyrestro.com</p>
                    <h3>Opening Hours</h3>
                    <p>Mon - Sun: 10:00 AM - 10:00 PM</p>
                </div>

                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    {submitted && <p className="success-message">Thank you for reaching out! We'll get back to you soon.</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>

            {/* <div className="map-section">
                <h2>Find Us Here</h2>
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.554127594275!2d85.32481741506162!3d27.717245632892955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1906a3f5fd2f%3A0x271c3d8c8b8f308f!2sKathmandu!5e0!3m2!1sen!2snp!4v1618834453949!5m2!1sen!2snp"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    allowFullScreen=""
                    aria-hidden="false"
                ></iframe>
            </div> */}
        </div>
    );
};

export default ContactPage;
