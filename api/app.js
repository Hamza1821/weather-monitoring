// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alertRoutes = require('./routes/alertRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const {startCronJobs} = require('./utils/cronJobs');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/alerts', alertRoutes);
app.use('/api/weather', weatherRoutes);

// Start cron jobs
startCronJobs();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
