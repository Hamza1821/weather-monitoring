const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/', weatherController.getWeatherData);
router.post('/update', weatherController.updateWeatherData);

module.exports = router;
