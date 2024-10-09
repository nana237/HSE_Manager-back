const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

router.get('/get-all', equipmentController.getAllEquipment);
router.get('/:company_id/get/:id', equipmentController.getEquipment);
router.post('/:company_id/create', equipmentController.createEquipment);
router.post('/:company_id/update/:id', equipmentController.updateEquipment);
router.post('/delete/:id', equipmentController.deleteEquipment);

module.exports = router;
