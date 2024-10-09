const express = require('express');
const router = express.Router();
const firstAidController = require('../controllers/firstAidKitController');

router.get('/get-all', firstAidController.getAllKits);
router.get('/get/:id', firstAidController.getKit);
router.post('/create', firstAidController.createKit);
router.post('/item/create/:id', firstAidController.createKitItem);
router.post('/update/:kitId/:itemId', firstAidController.updateKitItem);
router.post('/delete/:kitId/:itemId', firstAidController.deleteKitItem);

module.exports = router;
