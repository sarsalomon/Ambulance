const Router = require('express');
const peopleController = require('../controllers/peopleController');
const router = new Router();

router.post('/', peopleController.fetchAllPeople);
router.post('/byid', peopleController.fetchPeople);
router.post('/search', peopleController.search);
router.post('/add', peopleController.addPeople);
router.post('/update', peopleController.updatePeople);
router.post('/delete', peopleController.deletePeople);
router.get('/get/:id', peopleController.getPeople);

module.exports = router;