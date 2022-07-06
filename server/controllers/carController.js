const ApiError = require("../error/ApiError");
const model = require('../module/module');

class carController {
    async addCar(req, res, next){
        const {title, number, year, whoAdd} = req.body;
        if (!title) {
            return next(ApiError.badRequest('Moshina nomini yozing'));
        }
        const titlefind = await model.car.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Moshina mavjud'));
        } else {
            const addC = await model.car.create({title, number, year, whoAdd});
            return res.json(addC);
        }
    }

    async fetchCar(req, res, next){
        const fetchC = await model.car.find().sort({ _id: -1});
        return res.json(fetchC);
    }

    async fetchAllCar(req, res, next){
        const fetchC = await model.car.find().sort({ _id: -1});
        return res.json(fetchC);
    }

    async getCar(req, res, next){
        const {id} = req.params;
        const getC = await model.car.findById(id);
        return res.json(getC)
    }

    async updateCar(req, res, next){
        const {id, title, number, year, whoAdd} = req.body
        if (!title) {
            return next(ApiError.badRequest('Moshina nomi yozilmagan'));
        }
        const titlefind = await model.car.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Moshina mavjud'));
        } else {
            const updateC = await model.car.findByIdAndUpdate(id, {title, number, year, whoAdd},{new:true});
            return res.json(updateC);
        }
    }

    async deleteCar(req, res, next){
        const {id} = req.body;
        const deleteC = await model.car.findByIdAndDelete(id);
        return res.json(deleteC);
    }
}

module.exports = new carController();