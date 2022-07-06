const Router = require('express');
const houseController = require('../controllers/houseController');
const router = new Router();

router.post('/', houseController.fetchAllHouse);
router.post('/byid', houseController.fetchHouse);
router.post('/add', houseController.addHouse);
router.post('/update', houseController.updateHouse);
router.post('/delete', houseController.deleteHouse);
router.get('/get/:id', houseController.getHouse);

module.exports = router;