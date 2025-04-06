const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },


    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'

    },
    isActive: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        default: 'boy.png'

    },

    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date

    }


})
module.exports = mongoose.model('User', UserSchema);
