const Router = require('express');
const floorController = require('../controllers/floorController');
const router = new Router();

router.post('/', floorController.fetchAllFloor);
router.post('/byid', floorController.fetchFloor);
router.post('/add', floorController.addFloor);
router.post('/update', floorController.updateFloor);
router.post('/delete', floorController.deleteFloor);
router.get('/get/:id', floorController.getFloor);

module.exports = router;