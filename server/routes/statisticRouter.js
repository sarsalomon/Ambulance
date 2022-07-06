const Router = require('express');
const statisticController = require('../controllers/statisticController');
const router = new Router();

router.post('/', statisticController.fetchStatistic);
router.get('/get/:id', statisticController.getStatistic);

module.exports = router;