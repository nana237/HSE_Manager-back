const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authenticateToken = require("../middleware/authMiddleware");

router.get(':company_id/get-all', authenticateToken, alertController.getAllAlerts);
router.post(':company_id/create', authenticateToken, alertController.createAlert);
router.delete(':company_id/delete/:id', authenticateToken, alertController.deleteAlert);

module.exports = router;
