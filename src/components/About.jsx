import React from 'react';
import './AboutPage.css'; // Optional external CSS

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <h1>About Our Restaurant</h1>
                <p>
                    Welcome to our reservation system – where delicious moments begin! We blend modern convenience with traditional hospitality to ensure your dining experience is seamless from booking to billing.
                </p>
            </section>

            <section className="about-content">
                <div className="about-section">
                    <h2>Who We Are</h2>
                    <p>
                        We’re a passionate team dedicated to bringing people together through great food and flawless service. Our system allows you to book tables in advance, select your time slots, and even pay online securely via eSewa.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        To make dining more delightful, convenient, and hassle-free by leveraging modern technology. Whether it’s a dinner date, a business lunch, or a family gathering — we’ve got your table ready.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>✔ Easy and fast online reservations</li>
                        <li>✔ Reliable payment system with eSewa</li>
                        <li>✔ Detailed booking history and reminders</li>
                        <li>✔ Friendly support and personalized experience</li>
                    </ul>
                </div>
            </section>

            <section className="about-footer">
                <p>
                    Thank you for choosing us — your table is just a click away!
                </p>
            </section>
        </div>
    );
};

export default AboutPage;
