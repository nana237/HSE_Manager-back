const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const authenticateToken = require("../middleware/authMiddleware");

router.post('/create', authenticateToken, certificateController.createCertificate);
router.get('/get/:id', authenticateToken, certificateController.getCertificate);
router.post('/delete/:id', authenticateToken, certificateController.deleteCertificate);

module.exports = router;
