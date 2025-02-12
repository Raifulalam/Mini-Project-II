import React from 'react';

const FeaturesSection = () => {
    return (
        <section className="features" id="features">
            <h2>Why Choose Book My Restro?</h2>
            <div className="features-container">
                <div className="feature-item">
                    <h3>Easy Reservations</h3>
                    <p>Quick and simple process to book a table.</p>
                </div>
                <div className="feature-item">
                    <h3>Delicious Menu</h3>
                    <p>Explore our wide range of tasty dishes!</p>
                </div>
                <div className="feature-item">
                    <h3>Great Ambience</h3>
                    <p>Enjoy a cozy, welcoming atmosphere.</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
