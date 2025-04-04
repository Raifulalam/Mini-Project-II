const jwt = require('jsonwebtoken');
const jwtSecret = "mohammedRaifulAlamfromNepalBirgunj"; // Replace with your actual secret

// Middleware to verify JWT
const auth = (req, res, next) => {
    // Get token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);
        // Attach the user information to the request
        req.user = decoded;  // The decoded JWT contains the user information (id, name, etc.)
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: 'Token expired or invalid' });
    }
};

module.exports = auth;
