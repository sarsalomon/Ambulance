const ApiError = require("../error/ApiError");
const model = require('../module/module');

class cityorvillageController {
    async addCityOrVillage (req, res, next){
        const { title, territoryId, cityorvillage, whoAdd } = req.body;

        if (!title){
            return next(ApiError.badRequest("Tuman tanlanmadi"));
        }else if (!territoryId){
            return next(ApiError.badRequest("Joy tanlanmadi"));
        }

        const titlefind = await model.cityorvillage.findOne({title, territoryId, cityorvillage});

        if (titlefind) {
            if (titlefind.citytorvillage == 1) {
                return next(ApiError.badRequest('Bunaqa nomli Shahar mavjud'));
            } else {
                return next(ApiError.badRequest('Bunaqa nomli Qishloq mavjud'));
            }
        } else {
            const addA = await model.cityorvillage.create({title, territoryId, cityorvillage, whoAdd});
            return res.json(addA);
        }
    }

    async fetchCityOrVillage (req, res, next){
        const { territoryId } = req.body;
        const fetchA = await model.cityorvillage.find({territoryId}).sort({ _id: -1});
        return res.json(fetchA);
    }

    async fetchAllCityOrVillage (req, res, next){
        const fetchA = await model.cityorvillage.find().sort({ _id: -1});
        let data = []
        for (let i = 0; i < fetchA.length; i++ ){
            let id = fetchA[i].territoryId;
            const findTitle = await model.territory.findById(id);
            let obj = JSON.stringify(fetchA[i])

            let territoryTitle = ''
            if (!findTitle || findTitle == undefined || findTitle == null || findTitle == ''){
                territoryTitle = ''
            }else{
                territoryTitle = findTitle.title
            }


            obj = JSON.parse(obj)
            obj["territoryTitle"] = `${territoryTitle}`;
            data.push(obj)
        }
        return res.json(data);
    }

    async getCityOrVillage (req, res, next){
        const { id}  = req.params;
        const getA = await model.cityorvillage.findById(id);
        return res.json(getA);
    }

    async updateCityOrVillage (req, res, next){
        const { id, title, territoryId, cityorvillage, whoAdd } = req.body;

        if (!title) {
            return next(ApiError.badRequest('Shahar yoki Qishloq nomi yozilmagan'));
        }else if (!territoryId){
            return next(ApiError.badRequest("Joy tanlanmadi"));
        }else if (!cityorvillage){
            return next(ApiError.badRequest("Shahar yoki Qishloq tanlanmadi"));
        }

        const titlefind = await model.cityorvillage.findOne({title, territoryId, cityorvillage});

        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Shahar yoki Qishloq mavjud'));
        } else {
            const updateA = await model.cityorvillage.findByIdAndUpdate(id, {title, territoryId, cityorvillage, whoAdd},{new:true});
            return res.json(updateA);
        }
    }

    async deleteCityOrVillage (req, res, next){
        const { id } = req.body;
        const deleteA = await model.cityorvillage.findByIdAndDelete(id);
        return res.json(deleteA);
    }
}

module.exports = new cityorvillageController();