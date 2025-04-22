const express = require('express');
const Router = express.Router();
const Booking = require('../Model/BookoingSchema');
const authorization = require('../authMiddleware')

// Get all reservations
Router.get('/reservations', async (req, res) => {
    try {
        const data = await Booking.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data' });
        console.error(err);
    }
});

// Create a new reservation
Router.post('/reservations', authorization, async (req, res) => {
    const { name, email, phone, visitdate, timeSlot, guests, restaurant, table, note, restaurantId } = req.body;

    // Ensure visitDate is a valid Date and not in the past
    const parsedVisitDate = new Date(visitdate);
    if (isNaN(parsedVisitDate)) {
        return res.status(400).json({ message: 'Invalid visit date' });
    }
    if (parsedVisitDate < new Date()) {
        return res.status(400).json({ message: 'Visit date cannot be in the past' });
    }
    // Ensure user is logged in
    if (!req.user) {
        return res.status(401).json({ message: 'User not authorized to create a booking' });
    }
    const user = req.user;
    // Ensure the restaurant exists

    // Create a new booking
    const newBooking = new Booking({
        userId: user.id,
        name,
        email,
        phone,
        visitdate: parsedVisitDate,
        timeSlot,
        guests,
        restaurant,
        table,
        status: 'Pending', // Default value
        note,
        restaurantId,

    });

    try {
        const data = await newBooking.save();
        res.status(201).json({
            message: 'Booking successfully created',
            bookingId: data._id,  // You can return the booking ID here
            status: data.status,
        });
    } catch (err) {
        console.error('Error saving booking data:', err);
        res.status(500).json({ message: 'Error saving booking data', error: err.message });
    }
});

Router.get('/my-booking', authorization, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate('restaurant')
            .populate('timeSlot')
            .populate('status')
            .populate('note')
            .populate('visitdate');

        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching bookings.' });
    }
});


module.exports = Router;


