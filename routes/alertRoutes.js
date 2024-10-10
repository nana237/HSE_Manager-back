const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authenticateToken = require("../middleware/authMiddleware");

router.get('/get-all', authenticateToken, alertController.getAllAlerts);

module.exports = router;
