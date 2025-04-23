const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'Menu',
                required: true
            },
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    reservationDetails: {
        name: { type: String, required: true },
        email: String,
        phone: String,
        guests: Number,
        tableNumber: String,
        notes: String
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
