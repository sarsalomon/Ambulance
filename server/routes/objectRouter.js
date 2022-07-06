const Router = require('express');
const objectController = require('../controllers/objectController');
const router = new Router();

router.post('/', objectController.fetchAllObject);
router.post('/byid', objectController.fetchObject);
router.post('/add', objectController.addObject);
router.post('/update', objectController.updateObject);
router.post('/delete', objectController.deleteObject);
router.get('/get/:id', objectController.getObject);

module.exports = router;