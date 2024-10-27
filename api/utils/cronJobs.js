const cron = require('node-cron');
const weatherService = require('../services/weatherService');

// Set up a cron job to fetch and save weather data every X minutes (defined in .env)
exports.startCronJobs = async() => {
    const interval = process.env.API_UPDATE_INTERVAL || 5;
    console.log('Fetching weather data...');
        await weatherService.fetchAndSaveWeatherData()
    cron.schedule(`*/${interval} * * * *`, async () => {
        console.log('Fetching weather data...');
        await weatherService.fetchAndSaveWeatherData();
    });
};
