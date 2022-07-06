const Router = require('express');
const statistichistoryController = require('../controllers/statistichistoryController');
const router = new Router();

router.post('/', statistichistoryController.fetchAllStatistic);
router.post('/byid', statistichistoryController.fetchStatistic);
router.get('/get/:id', statistichistoryController.getStatistic);

module.exports = router;