const Router = require('express');
const router = new Router();
const apartmentRouter         = require('./apartmentRouter');
const callRouter              = require('./callRouter');
const carRouter               = require('./carRouter');
const diseaseRouter           = require('./diseaseRouter');
const districtRouter          = require('./districtRouter');
const driverRouter            = require('./driverRouter');
const entranceRouter          = require('./entranceRouter');
const floorRouter             = require('./floorRouter');
const houseRouter             = require('./houseRouter');
const objectRouter            = require('./objectRouter');
const peopleRouter            = require('./peopleRouter');
const sideRouter              = require('./sideRouter');
const statistichistoryRouter  = require('./statistichistoryRouter');
const statisticRouter         = require('./statisticRouter');
const userRouter              = require('./userRouter');

router.use('/apartment',apartmentRouter);
router.use('/call',callRouter);
router.use('/car',carRouter);
router.use('/disease',diseaseRouter);
router.use('/district',districtRouter);
router.use('/driver',driverRouter);
router.use('/entrance',entranceRouter);
router.use('/floor',floorRouter);
router.use('/house',houseRouter);
router.use('/object',objectRouter);
router.use('/people',peopleRouter);
router.use('/side',sideRouter);
router.use('/statistichistory',statistichistoryRouter);
router.use('/statistic',statisticRouter);
router.use('/user',userRouter);

module.exports = router;