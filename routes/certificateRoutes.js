const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.post('/create', certificateController.createCertificate);
router.get('/get/:id', certificateController.getCertificate);
router.post('/delete/:id', certificateController.deleteCertificate);

module.exports = router;
