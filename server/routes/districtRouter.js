const Router = require('express');
const districtController = require('../controllers/districtController');
const router = new Router();

router.post('/', districtController.fetchAllDistrict);
router.post('/search', districtController.search);
router.post('/byid', districtController.fetchDistrict);
router.post('/add', districtController.addDistrict);
router.post('/update', districtController.updateDistrict);
router.post('/delete', districtController.deleteDistrict);
router.get('/get/:id', districtController.getDistrict);

module.exports = router;