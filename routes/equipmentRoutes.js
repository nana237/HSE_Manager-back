const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/:company_id/get-all', authenticateToken, equipmentController.getAllEquipment);
router.get('/:company_id/get/:id', authenticateToken, equipmentController.getEquipment);
router.post('/:company_id/create', authenticateToken, equipmentController.createEquipment);
router.put('/:company_id/update/:id', authenticateToken, equipmentController.updateEquipment);
router.delete('/:company_id/delete/:id', authenticateToken, equipmentController.deleteEquipment);

module.exports = router;
