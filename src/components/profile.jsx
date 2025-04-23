import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);



    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/login');
    };

    if (!user) {
        return <div className="user-profile__no-user">No user found. Please log in.</div>;
    }

    return (
        <div className="user-profile">
            {/* Section: My Info */}
            <section className="profile-card">
                <img
                    src={user.avatar || '/boy.png'}
                    alt={user.name || 'User'}
                    className="profile-avatar"
                />
                <h2 className="profile-name">{user.name || 'N/A'}</h2>
                <p className="profile-email">{user.email || 'N/A'}</p>
                {user.phone && <p className="profile-phone">{user.phone}</p>}

                <div className="profile-actions">
                    <Link to="/edit-profile" className="btn btn-edit">Edit Profile</Link>
                    <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                </div>
            </section>


        </div>
    );
};

export default UserProfile;
