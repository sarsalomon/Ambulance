const Router = require('express');
const { SLLT } = require('../bot/tg');
const driverController = require('../controllers/driverController');
const router = new Router();

router.post('/', driverController.fetchAllDriver);
router.post('/byid', driverController.fetchDriver);
router.post('/add', driverController.addDriver);
router.post('/update', driverController.updateDriver);
router.post('/delete', driverController.deleteDriver);
router.get('/get/:id', driverController.getDriver);
router.post('/traking', driverController.fetchTraking);

module.exports = router;