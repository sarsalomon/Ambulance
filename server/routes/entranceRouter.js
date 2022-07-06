const Router = require('express');
const entranceController = require('../controllers/entranceController');
const router = new Router();

router.post('/', entranceController.fetchAllEntrance);
router.post('/byid', entranceController.fetchEntrance);
router.post('/add', entranceController.addEntrance);
router.post('/update', entranceController.updateEntrance);
router.post('/delete', entranceController.deleteEntrance);
router.get('/get/:id', entranceController.getEntrance);

module.exports = router;