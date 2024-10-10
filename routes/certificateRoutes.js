const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const authenticateToken = require("../middleware/authMiddleware");

router.post('/:company_id/create', authenticateToken, certificateController.createCertificate);
router.get('/:company_id/get/:id', authenticateToken, certificateController.getCertificate);
router.post('/:company_id/delete/:id', authenticateToken, certificateController.deleteCertificate);

module.exports = router;
