const ApiError = require("../error/ApiError");
const model = require('../module/module');

class districtController {
    async search(req, res, next){
        let { title } = req.body
        
        let districts
        if(title.length>0){     
            districts = await model.district.find({title: { $regex : '.*'+ title + '.*' }}).sort({ _id: -1 })
        }
        return res.json(districts)
    }

    async addDistrict(req, res, next){
        const { title, whoAdd } = req.body;

        if (!title) {
            return next(ApiError.badRequest('Tuman ni nomi yozing'));
        }

        const titlefind = await model.district.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Tuman mavjud'));
        } else {
            const addDi = await model.district.create({title, whoAdd});
            return res.json(addDi);
        }
    }

    async fetchDistrict(req, res, next){
        const fetchDi = await model.district.find().sort({ _id: -1});
        return res.json(fetchDi);
    }

    async fetchAllDistrict(req, res, next){
        const fetchDi = await model.district.find().sort({ _id: -1});
        return res.json(fetchDi);
        // let data = []
        // for (let i = 0; i < fetchDi.length; i++ ){
        //     let idTerritory = fetchDi[i].territoryId;
        //     let idCityOrVillage = fetchDi[i].cityorvillageId;
        //     const findTitleTerritory = await model.territory.findById(idTerritory);
        //     const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
        //     let obj = JSON.stringify(fetchDi[i])


        //     let territoryTitle = ''
        //     if (!findTitleTerritory || findTitleTerritory == undefined || findTitleTerritory == null || findTitleTerritory == ''){
        //         territoryTitle = ''
        //     }else{
        //         territoryTitle = findTitleTerritory.title
        //     }

        //     let cityorvillageTitle = ''
        //     if (!findTitleCityOrVillage || findTitleCityOrVillage == undefined || findTitleCityOrVillage == null || findTitleCityOrVillage == ''){
        //         cityorvillageTitle = ''
        //     }else{
        //         cityorvillageTitle = findTitleCityOrVillage.title
        //     }

        //     obj = JSON.parse(obj)
        //     obj["territoryTitle"] = `${territoryTitle}`;
        //     obj["cityorvillageTitle"] = `${cityorvillageTitle}`;
        //     data.push(obj)
        // }
        // return res.json(data);
    }

    async getDistrict(req, res, next){
        const {id} = req.params;
        const getDi = await model.district.findById(id);
        return res.json(getDi)
    }

    async updateDistrict(req, res, next){
        const {id, title, whoAdd} = req.body

        if (!title) {
            return next(ApiError.badRequest('Rayon nomi yozilmagan'));
        }

        const titlefind = await model.district.findOne({title, territoryId, cityorvillageId});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Rayon mavjud'));
        } else {
            const updateDi = await model.district.findByIdAndUpdate(id, {title, whoAdd}, {new:true});
            return res.json(updateDi);
        }
    }

    async deleteDistrict(req, res, next){
        const {id} = req.body;
        const deleteDi = await model.district.findByIdAndDelete(id);
        return res.json(deleteDi);
    }
}

module.exports = new districtController();