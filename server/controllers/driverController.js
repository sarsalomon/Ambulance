const ApiError = require("../error/ApiError");
const model = require('../module/module');

class driverController {
    async addDriver(req, res, next){
        const {title, phone, address, birthday, chatId, carId, whoAdd} = req.body;

        if (!title) {
            return next(ApiError.badRequest('Haydovchi nomini yozing'));
        } else if (!phone) {
            return next(ApiError.badRequest('Telefon raqamni yozing'));
        } else if (!address) {
            return next(ApiError.badRequest('Manzilni yozing'));
        } else if (!birthday) {
            return next(ApiError.badRequest('Tu`gilgan kuni tanlang'));
        } else if (!carId) {
            return next(ApiError.badRequest('Moshina tanlang'));
        }

        const titlefind = await model.driver.findOne({title, phone, address, birthday, carId});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Haydovchi mavjud'));
        } else {
            const addD = await model.driver.create({title, phone, address, birthday, chatId, carId, chatId:'', whoAdd, status:false});
            return res.json(addD);
        }
    }

    async fetchDriver(req, res, next){
        const fetchD = await model.driver.find().sort({ _id: -1});
        return res.json(fetchD);
    }

    async fetchAllDriver(req, res, next){
        const fetchD = await model.driver.find().sort({ _id: -1});
        let data = []
        for (let i = 0; i < fetchD.length; i++ ){
            let idDriver = fetchD[i].carId;
            const findTitleDriver = await model.car.findById(idDriver);
            let obj = JSON.stringify(fetchD[i])

            let Drivertitle = ''
            if (!findTitleDriver || findTitleDriver == undefined || findTitleDriver == null || findTitleDriver == ''){
                Drivertitle = ''
            }else{
                Drivertitle = findTitleDriver.title
            }

            obj = JSON.parse(obj)
            obj["Drivertitle"] = `${Drivertitle}`;
            data.push(obj)
        }
        return res.json(data);
    }

    async fetchTraking(req, res, next){
        const fetchT = await model.traking.find().sort({ _id: -1});
        return res.json(fetchT);
    }

    async getDriver(req, res, next){
        const {id} = req.params;
        const getD = await model.driver.findById(id);
        return res.json(getD)
    }

    async updateDriver(req, res, next){
        const {id, title, phone, address, birthday, chatId, carId, whoAdd} = req.body;

        if (!title) {
            return next(ApiError.badRequest('Haydovchi nomini yozing'));
        } else if (!phone) {
            return next(ApiError.badRequest('Telefon raqamni yozing'));
        } else if (!address) {
            return next(ApiError.badRequest('Manzilni yozing'));
        } else if (!birthday) {
            return next(ApiError.badRequest('Tu`gilgan kuni tanlang'));
        } else if (!carId) {
            return next(ApiError.badRequest('Moshina tanlang'));
        }
        
        const titlefind = await model.driver.findOne({title, phone, address, birthday, chatId, carId});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Haydovchi mavjud'));
        } else {
            const updateD = await model.driver.findByIdAndUpdate(id, {title, phone, address, birthday, chatId, carId, whoAdd},{new:true});
            return res.json(updateD);
        }
    }

    async deleteDriver(req, res, next){
        const {id} = req.body;
        const deleteD = await model.driver.findByIdAndDelete(id);
        return res.json(deleteD);
    }
}

module.exports = new driverController();