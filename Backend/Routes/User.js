const express = require('express');
const router = express.Router();
const User = require('../Model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../authMiddleware');  // Import the authentication middleware

const jwtSecret = "mohammedRaifulAlamfromNepalBirgunj";

// User Registration Route
router.post('/createUser', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            role: req.body.role,
        });

        const savedUser = await user.save();

        res.status(201).json({
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const data = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        const token = jwt.sign(data, jwtSecret, { expiresIn: '1h' });  // Add an expiration time for security
        return res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User Information Route (Protected)
router.get('/me', auth, async (req, res) => {
    try {
        // req.user is populated by the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const data = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            created_at: user.created_at.toISOString(),
        };

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
