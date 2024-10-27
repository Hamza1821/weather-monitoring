const axios = require('axios');
const Weather = require('../models/Weather');
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

exports.fetchAndSaveWeatherData = async () => {
    try {
        for (const city of CITIES) {
            const response = await axios.get(BASE_URL, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });

            const { main, name } = response.data;
            const newWeatherData = new Weather({
                city: name,
                main: main.temp,
                temp: main.temp,
                feels_like: main.feels_like
            });

            await newWeatherData.save();
            console.log(`Weather data saved for ${name}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};
