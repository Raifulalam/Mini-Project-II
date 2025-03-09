const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');


// Load environment variables from .env file
dotenv.config();

// MongoDB URI from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Start the Express server after MongoDB connection is established
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    });

app.use('/api', require('./Routes/Restaurants'))
// Basic route
app.get('/', (req, res) => {
    res.send('Successfully started');
});
