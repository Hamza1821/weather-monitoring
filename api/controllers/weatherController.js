const Weather = require('../models/Weather');
const weatherService = require('../services/weatherService');

// Get all weather data
exports.getWeatherData = async (req, res) => {
    try {
        const weatherData = await Weather.find();
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error });
    }
};

// Fetch new data from OpenWeather API
exports.updateWeatherData = async (req, res) => {
    try {
        await weatherService.fetchAndSaveWeatherData();
        res.json({ message: 'Weather data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating weather data', error });
    }
};
