const express = require('express');
const router = express.Router();
const firstAidController = require('../controllers/firstAidKitController');
const authenticateToken = require("../middleware/authMiddleware");

router.get('/:company_id/get-all', authenticateToken, firstAidController.getAllKits);
router.get('/:company_id/get/:id', authenticateToken, firstAidController.getKit);
router.post('/:company_id/create', authenticateToken, firstAidController.createKit);
router.post('/:company_id/create/:id', authenticateToken, firstAidController.createKitItem);
router.put('/:company_id/:kitId/update/:itemId', authenticateToken, firstAidController.updateKitItem);
router.delete('/:company_id/:kitId/delete/:itemId', authenticateToken, firstAidController.deleteKitItem);

module.exports = router;
