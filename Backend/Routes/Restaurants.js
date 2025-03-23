const express = require('express');
const Router = express.Router();
const RestaurantSchema = require('../Model/RestaurantsSchema');
// GET all restaurants
Router.get('/restaurants', (req, res, next) => {
    RestaurantSchema.find()  // Fetch all documents from the 'restaurants' collection
        .then((data) => {
            res.status(200).json(data); // Send data as JSON response
        })
        .catch((err) => {
            console.error(err); // Log error for debugging
            res.status(500).json({ message: 'An error occurred while fetching restaurants' }); // Send error response
        });
});

// POST a new restaurant
Router.post('/restaurants', (req, res) => {
    const { name, location, image, tables, price, specification, reserver, vacant, timeslots, reviews, owner } = req.body;

    // Validate incoming data
    if (!name || !location || !price || !tables || !reserver || vacant === undefined || !timeslots || !owner) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newRestaurant = new RestaurantSchema({
        name,
        location,
        image,
        tables,
        price,
        specification,
        reserver,
        vacant,
        timeslots,
        reviews,
        owner
    });

    // Save the new restaurant to the database
    newRestaurant.save()
        .then((savedRestaurant) => {
            res.status(201).json(savedRestaurant); // Send the created restaurant data in the response
        })
        .catch((err) => {
            console.error(err); // Log error for debugging
            res.status(500).json({ message: 'An error occurred while adding the restaurant' }); // Send error response
        });
});

module.exports = Router;
