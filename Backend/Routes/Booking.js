const express = require('express')
const Router = express.Router();

const Booking = require('../Model/BookoingSchema');

Router.get('/reservations', (req, res) => {
    Booking.find().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({ message: 'Error fetching data' });
        console.error(err);
    });
});

Router.post('/reservations', (req, res) => {
    const { name, email, phone, visitdate, timeSlot, guest, restaurant, table, note } = req.body;

    // Ensure 'visitdate' is properly parsed to a Date object
    const parsedVisitDate = new Date(visitdate);

    const newBooking = new Booking({
        name,
        email,
        phone,
        visitdate: parsedVisitDate,
        timeSlot,
        guest,
        restaurant,
        table,
        status: 'Pending', // Default value
        note
    });

    newBooking.save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error saving data' });
            console.error(err);
        });
});
module.exports = Router;
