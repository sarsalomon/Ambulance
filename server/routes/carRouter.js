const Router = require('express');
const carController = require('../controllers/carController');
const router = new Router();

router.post('/', carController.fetchAllCar);
router.post('/byid', carController.fetchCar);
router.post('/add', carController.addCar);
router.post('/update', carController.updateCar);
router.post('/delete', carController.deleteCar);
router.get('/get/:id', carController.getCar);

module.exports = router;