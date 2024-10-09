const Alert = require('../models/Alert');

exports.getAllAlerts = async (req, res) => {
    const alerts = await Alert.findAll();
    res.json(alerts);
};
