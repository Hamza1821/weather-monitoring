// models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    condition: { type: String, required: true }, // e.g., "temperature"
    threshold: { type: Number, required: true }, // e.g., 35 for temperature
    type: { type: String, required: true }, // e.g., "exceed" or "drop"
    city: { type: String, required: true }, // The city for which this alert applies
    isActive: { type: Boolean, default: true }, // Active state of the alert
});

module.exports = mongoose.model('Alert', alertSchema);
