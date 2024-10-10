const express = require('express');
const router = express.Router();
const firstAidController = require('../controllers/firstAidKitController');
const authenticateToken = require("../middleware/authMiddleware");

router.get('/get-all', authenticateToken, firstAidController.getAllKits);
router.get('/get/:id', authenticateToken, firstAidController.getKit);
router.post('/create', authenticateToken, firstAidController.createKit);
router.post('/item/create/:id', authenticateToken, firstAidController.createKitItem);
router.post('/update/:kitId/:itemId', authenticateToken, firstAidController.updateKitItem);
router.post('/delete/:kitId/:itemId', authenticateToken, firstAidController.deleteKitItem);

module.exports = router;
