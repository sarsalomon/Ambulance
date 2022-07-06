const ApiError = require("../error/ApiError");
const model = require('../module/module');

class entranceController {
    async addEntrance(req, res, next){
        const {title, whoAdd} = req.body;
        
        if (!title) {
            return next(ApiError.badRequest('Kirish nomini yozing'));
        }
        const titlefind = await model.entrance.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Kirish mavjud'));
        } else {
            const addE = await model.entrance.create({title, whoAdd});
            return res.json(addE);
        }
    }

    async fetchEntrance(req, res, next){
        const fetchE = await model.entrance.find().sort({ _id: -1});
        return res.json(fetchE);
    }

    async fetchAllEntrance(req, res, next){
        const fetchE = await model.entrance.find().sort({ _id: -1});
        return res.json(fetchE);
    }
    
    async getEntrance(req, res, next){
        const {id} = req.params;
        const getE = await model.entrance.findById(id);
        return res.json(getE)
    }

    async updateEntrance(req, res, next){
        const {id, title, whoAdd} = req.body
        if (!title) {
            return next(ApiError.badRequest('Kirish nomi yozilmagan'));
        }
        const titlefind = await model.entrance.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Kirish mavjud'));
        } else {
            const updateE = await model.entrance.findByIdAndUpdate(id, {title, whoAdd},{new:true});
            return res.json(updateE);
        }
    }

    async deleteEntrance(req, res, next){
        const {id} = req.body;
        const deleteE = await model.entrance.findByIdAndDelete(id);
        return res.json(deleteE);
    }
}

module.exports = new entranceController();