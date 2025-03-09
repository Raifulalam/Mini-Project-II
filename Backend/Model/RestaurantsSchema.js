const mongoose = require('mongoose');
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },  // For the image URL or path
    tables: { type: Number, required: true },  // Number of tables in the restaurant
    price: { type: String, required: true },  // Price range as a string
    specification: {  // Specifications like outdoor and indoor availability
        outdoor: { type: Boolean, default: false },
        indoor: { type: Boolean, default: false },
    },
    reserver: { type: String, enum: ['Yes', 'No'], required: true },  // Whether reservation is allowed
    vacant: { type: Number, required: true },  // Number of vacant tables
    timeslots: [  // Available time slots for each table
        {
            table: { type: Number, required: true },
            time: { type: String, required: true },
            available: { type: Boolean, required: true },
        },
    ],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],  // References to reviews
    owner: { type: Schema.Types.ObjectId, ref: 'User' },  // Owner of the restaurant
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
