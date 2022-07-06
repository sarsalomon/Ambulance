const ApiError = require("../error/ApiError");
const model = require('../module/module');

class objectController {
    async addObject(req, res, next){
        const {districtId, neighborhoodId, houseId, latitude, longitude, title, whoAdd} = req.body;
        
        if (!title) {
            return next(ApiError.badRequest('Obyekt nomini yozing'));
        }
        const titlefind = await model.object.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Obyekt mavjud'));
        } else {
            const addO = await model.object.create({districtId, neighborhoodId, houseId, latitude, longitude, title, whoAdd});
            return res.json(addO);
        }
    }

    async fetchObject(req, res, next){
        const fetchO = await model.object.find().sort({ _id: -1});
        return res.json(fetchO);
    }

    async fetchAllObject(req, res, next){
        const fetchO = await model.object.find().sort({ _id: -1});
        return res.json(fetchO);
    }

    async getObject(req, res, next){
        const {id} = req.params;
        const getO = await model.object.findById(id);
        return res.json(getO)
    }

    async updateObject(req, res, next){
        const {id, districtId, neighborhoodId, houseId, latitude, longitude, title, whoAdd} = req.body
        if (!title) {
            return next(ApiError.badRequest('Obyekt nomi yozilmagan'));
        }
        const titlefind = await model.object.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Obyekt mavjud'));
        } else {
            const updateO = await model.object.findByIdAndUpdate(id, {districtId, neighborhoodId, houseId, latitude, longitude, title, whoAdd},{new:true});
            return res.json(updateO);
        }
    }

    async deleteObject(req, res, next){
        const {id} = req.body;
        const deleteO = await model.object.findByIdAndDelete(id);
        return res.json(deleteO);
    }
}

module.exports = new objectController();