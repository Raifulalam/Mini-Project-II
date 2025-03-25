const { getRounds } = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to MongoDB
const BookingService = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    visitdate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    table: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    note: String,
    guest: { type: Number, required: true, default: 1 },
    created_at: { type: Date, default: Date.now },


})

module.exports = mongoose.model('BookingService', BookingService);

