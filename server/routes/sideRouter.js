const Router = require('express');
const sideController = require('../controllers/sideController');
const router = new Router();

router.post('/', sideController.fetchAllSide);
router.post('/byid', sideController.fetchSide);
router.post('/add', sideController.addSide);
router.post('/update', sideController.updateSide);
router.post('/delete', sideController.deleteSide);
router.get('/get/:id', sideController.getSide);

module.exports = router;