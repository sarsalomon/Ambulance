const ApiError = require("../error/ApiError");
const model = require('../module/module');

class floorController {
    async addFloor(req, res, next){
        const {title, whoAdd} = req.body;
        
        if (!title) {
            return next(ApiError.badRequest('Qavat nomini yozing'));
        }
        const titlefind = await model.floor.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Qavat mavjud'));
        } else {
            const addF = await model.floor.create({title, whoAdd});
            return res.json(addF);
        }
    }

    async fetchFloor(req, res, next){
        const fetchF = await model.floor.find().sort({ _id: -1});
        return res.json(fetchF);
    }

    async fetchAllFloor(req, res, next){
        const fetchF = await model.floor.find().sort({ _id: -1});
        return res.json(fetchF);
    }

    async getFloor(req, res, next){
        const {id} = req.params;
        const getF = await model.floor.findById(id);
        return res.json(getF)
    }

    async updateFloor(req, res, next){
        const {id, title, whoAdd} = req.body
        if (!title) {
            return next(ApiError.badRequest('Qavat nomi yozilmagan'));
        }
        const titlefind = await model.floor.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Qavat mavjud'));
        } else {
            const updateF = await model.floor.findByIdAndUpdate(id, {title, whoAdd},{new:true});
            return res.json(updateF);
        }
    }

    async deleteFloor(req, res, next){
        const {id} = req.body;
        const deleteF = await model.floor.findByIdAndDelete(id);
        return res.json(deleteF);
    }
}

module.exports = new floorController();