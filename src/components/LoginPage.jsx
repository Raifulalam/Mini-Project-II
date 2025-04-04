// src/Login.js
import React, { useState } from 'react';
import './Login.css';
import loginImage from '../assets/Images/loginpageImage.avif';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Importing and using the navigate hook

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    // Store the token in localStorage after a successful login
                    localStorage.setItem('authToken', data.token);
                    alert("Login successful");

                    setEmail('');
                    setPassword('');
                    navigate('/');  // Navigate to the home page or dashboard

                } else {
                    alert("Login failed, please check your credentials.");
                }
            })
            .catch(err => {
                console.error(err);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div className='login-page'>
            <div className="login-image">
                <img src={loginImage} alt="Login Image" />
                <span className='login-message'>
                    <h3>Welcome to Book My Restro!</h3>
                    Sign in to access your account and book your favorite meals.
                </span>
            </div>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
