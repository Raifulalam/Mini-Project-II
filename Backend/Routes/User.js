const express = require('express');
const router = express.Router();
const User = require('../Model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../authMiddleware');


const jwtSecret = "mohammedRaifulAlamfromNepalBirgunj";

// User Registration Route
router.post('/createUser', async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user instance
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await user.save();

        // Respond with the saved user details (excluding password)
        res.status(201).json({
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        // If user not found or password does not match, return an error
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Compare password
        const isValidPassword = bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If user is found and password matches, return the user's details
        const data = {
            id: user._id,
            name: user.name,
            email: user.email,

        };
        // Generate a JSON Web Token
        const token = jwt.sign(data, jwtSecret);
        return res.json({ sucess: true, token });

    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
