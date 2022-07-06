const Router = require('express');
const callController = require('../controllers/callController');
const router = new Router();

router.post('/', callController.fetchAllCall);
router.post('/byid', callController.fetchCall);
router.post('/add', callController.addCall);
router.post('/update', callController.updateCall);
router.post('/delete', callController.deleteCall);
router.get('/get/:id', callController.getCall);

module.exports = router;