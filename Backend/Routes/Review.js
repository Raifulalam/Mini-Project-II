const mongoose = require('mongoose');
const express = require('express');
const Review = require('../Model/ReviewSchema');
const Router = express.Router();

// Get all reviews
Router.get('/reviews', async (req, res) => {
    try {
        const data = await Review.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data' });
        console.error(err);
    }
});

// Create a new review
Router.post('/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ message: 'Error creating review' });
        console.error(err);
    }
});

// Get all reviews by restaurant ID
Router.get('/reviews/:id', async (req, res) => {
    try {
        const data = await Review.find({ restaurantId: req.params.id }).sort({ createdAt: -1 }); // 👈 Corrected this line

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this restaurant' });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data' });
        console.error(err);
    }
});


module.exports = Router;
