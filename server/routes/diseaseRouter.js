const Router = require('express');
const diseaseController = require('../controllers/diseaseController');
const router = new Router();

router.post('/', diseaseController.fetchAllDisease);
router.post('/info', diseaseController.fetchAllDiseaseInfo);
router.post('/byid', diseaseController.fetchDisease);
router.post('/infobyid', diseaseController.fetchDiseaseInfo);
router.post('/add', diseaseController.addDisease);
router.post('/infoadd', diseaseController.addDiseaseInfo);
router.post('/update', diseaseController.updateDisease);
router.post('/delete', diseaseController.deleteDisease);
router.post('/deleteinfo', diseaseController.deleteDiseaseInfo);
router.get('/get/:id', diseaseController.getDisease);

module.exports = router;