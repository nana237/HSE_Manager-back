const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authenticateToken = require("../middleware/authMiddleware");

router.post('/create', companyController.createCompany);
router.get('/get', companyController.getCompanies);
router.post('/update/:id', authenticateToken, companyController.updateCompany);
router.post('/login', companyController.loginCompany);

module.exports = router;
