const ApiError = require("../error/ApiError");
const model = require('../module/module');

class sideController {
    async addSide(req, res, next){
        const {title, idNumber, whoAdd} = req.body;
        
        if (!title) {
            return next(ApiError.badRequest('Taraf nomini yozing'));
        } else if (!idNumber) {
            return next(ApiError.badRequest('Raqam yozilmadi'));
        }

        const titlefind = await model.side.findOne({title, idNumber});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Taraf mavjud'));
        } else {
            const addS = await model.side.create({title, idNumber, whoAdd});
            return res.json(addS);
        }
    }

    async fetchSide(req, res, next){
        const fetchS = await model.side.find().sort({ _id: -1});
        return res.json(fetchS);
    }

    async fetchAllSide(req, res, next){
        const fetchS = await model.side.find().sort({ _id: -1});
        return res.json(fetchS);
    }

    async getSide(req, res, next){
        const {id} = req.params;
        const getS = await model.side.findById(id);
        return res.json(getS)
    }

    async updateSide(req, res, next){
        const {id, title, idNumber, whoAdd} = req.body;

        if (!title) {
            return next(ApiError.badRequest('Taraf nomi yozilmagan'));
        } else if (!idNumber) {
            return next(ApiError.badRequest('Raqam yozilmadi'));
        }

        const titlefind = await model.side.findOne({title, idNumber});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Taraf mavjud'));
        } else {
            const updateS = await model.side.findByIdAndUpdate(id, {title, idNumber, whoAdd},{new:true});
            return res.json(updateS);
        }
    }

    async deleteSide(req, res, next){
        const {id} = req.body;
        const deleteS = await model.side.findByIdAndDelete(id);
        return res.json(deleteS);
    }
}

module.exports = new sideController();