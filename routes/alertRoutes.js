const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.get('/get-all', alertController.getAllAlerts);

module.exports = router;
