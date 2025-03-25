const express = require('express');
const Router = express.Router();
const Booking = require('../Model/BookoingSchema');

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
Router.post('/reservations', async (req, res) => {
    const { name, email, phone, visitdate, timeSlot, guests, restaurant, table, note, restaurantId } = req.body;

    // Ensure visitDate is a valid Date and not in the past
    const parsedVisitDate = new Date(visitdate);
    if (isNaN(parsedVisitDate)) {
        return res.status(400).json({ message: 'Invalid visit date' });
    }
    if (parsedVisitDate < new Date()) {
        return res.status(400).json({ message: 'Visit date cannot be in the past' });
    }

    const newBooking = new Booking({
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

module.exports = Router;
