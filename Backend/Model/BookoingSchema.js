const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to MongoDB
const BookingService = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    visitdate: { type: Date, required: true }, // Changed to Date type
    timeSlot: { type: String, required: true },
    restaurant: { type: String, required: true }, // Reference to Restaurant
    restaurantId: { type: String, required: true },
    table: { type: String, required: true }, // Reference to Table
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    note: String,
    guest: { type: Number, required: true, default: 1 },
    userId: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BookingService', BookingService);
