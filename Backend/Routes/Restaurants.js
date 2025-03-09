const express = require('express');
const Router = express.Router();
const RestaurantSchema = require('../Model/RestaurantsSchema');
const { Route } = require('react-router-dom');

Router.get('/restaurants', (req, res, next) => {
    RestaurantSchema.find()
        .then((data) => {
            res.status(200).json(data); // Send data as JSON response
        })
        .catch((err) => {
            console.error(err); // Log error for debugging
            res.status(500).json({ message: 'An error occurred while fetching restaurants' }); // Send error response
        });
});
Router.post('/restaurants', (req, res) => {


})

module.exports = Router;
