const Alert = require('../models/Alert');


exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ isActive: true });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching alerts', error });
    }
};

// Add a new alert
exports.createAlert = async (req, res) => {
    const { condition, threshold } = req.body;
    try {
        const alert = new Alert({ condition, threshold });
        await alert.save();
        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({ message: 'Error creating alert', error });
    }
};
