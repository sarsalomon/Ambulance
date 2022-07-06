const Router = require('express');
const apartmentController = require('../controllers/apartmentController');
const router = new Router();

router.post('/', apartmentController.fetchAllApartment);
router.post('/byid', apartmentController.fetchApartment);
router.post('/add', apartmentController.addApartment);
router.post('/update', apartmentController.updateApartment);
router.post('/delete', apartmentController.deleteApartment);
router.get('/get/:id', apartmentController.getApartment);

module.exports = router;