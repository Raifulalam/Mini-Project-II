const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Starter', 'Main Course', 'Dessert', 'Beverage'], // Example categories
        required: true
    },
    image: {
        type: String // URL to image
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Menu', MenuSchema);
