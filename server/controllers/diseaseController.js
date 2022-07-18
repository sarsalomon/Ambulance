const ApiError = require("../error/ApiError");
const model = require('../module/module');

class diseaseController {
    async addDisease(req, res, next){
        const {title, whoAdd} = req.body;
        if (!title) {
            return next(ApiError.badRequest('Kasallik nomini yozing'));
        }
        const titlefind = await model.disease.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Kasallik mavjud'));
        }
            const addD = await model.disease.create({title, whoAdd});
            return res.json(addD);
        
    }

    async addDiseaseInfo(req, res, next){
        let { diseaseId, info, whoAdd} = req.body;
        if (!diseaseId){
            return next(ApiError.badRequest("Kassalik toifasi tanlanmadi"));
        } else if (!info){
            return next(ApiError.badRequest("Iltimos kamida bir dona kassalik yozing"));
        } 

        if (info) {
            info = JSON.parse(info);
            for(let i = 0; i < info.length; i++) {
                let title = info[i].title
                let description = info[i].description
                const finddiseaseinfo = await model.diseaseinfo.findOne({diseaseId,title});
                if (finddiseaseinfo) {
                    // next(ApiError.badRequest(`${title} nomli Kasallik mavjud`));
                } else {
                    const adddiseaseinfo = await model.diseaseinfo.create({
                        diseaseId: diseaseId,
                        title: title,
                        description: description,
                    })
                    if (adddiseaseinfo && i == (info.length - 1)) {
                        return res.json(adddiseaseinfo);
                    }
                }
            }
            // info.forEach((i) => {
            //     const diseaseinfofind = await model.diseaseinfo.findOne({diseaseId,title});
            //     if (diseaseinfofind) {
            //         return next(ApiError.badRequest('Bunaqa nomli Kasallik mavjud'));
            //     } else {
            //         model.diseaseinfo.create({
            //             diseaseId: diseaseId,
            //             title: i.title,
            //             description: i.description,
            //         })
            //     }
            // })
        }

    }

    async fetchDisease(req, res, next){
        const fetchD = await model.disease.find().sort({ _id: -1});
        return res.json(fetchD);
    }
    
    async fetchAllDisease(req, res, next){
        const fetchD = await model.disease.find().sort({ _id: -1});
        return res.json(fetchD);
    }
    
    async fetchDiseaseInfo(req, res, next){
        const {diseaseId} = req.body;
        const fetchDI = await model.diseaseinfo.find({diseaseId}).sort({ _id: -1});
        return res.json(fetchDI);
    }
    
    async fetchAllDiseaseInfo(req, res, next){
        const fetchDI = await model.diseaseinfo.find().sort({ _id: -1});
        return res.json(fetchDI);
    }
    
    async getDisease(req, res, next){
        const {id} = req.params;
        const getD = await model.disease.findById(id);
        return res.json(getD)
    }
    
    async getDiseaseInfo(req, res, next){
        const {id} = req.params;
        const getD = await model.diseaseinfo.findById(id);
        return res.json(getD)
    }

    async updateDisease(req, res, next){
        const {id, title, whoAdd} = req.body
        if (!title) {
            return next(ApiError.badRequest('Kasallik nomi yozilmagan'));
        }
        const titlefind = await model.disease.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Kasallik mavjud'));
        } else {
            const updateD = await model.disease.findByIdAndUpdate(id, {title, whoAdd},{new:true});
            return res.json(updateD);
        }
    }
    
    async updateDiseaseInfo(req, res, next){
        const {id, title, whoAdd} = req.body
        if (!title) {
            return next(ApiError.badRequest('Kasallik nomi yozilmagan'));
        }
        const titlefind = await model.diseaseinfo.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Kasallik mavjud'));
        } else {
            const updateD = await model.diseaseinfo.findByIdAndUpdate(id, {title, whoAdd},{new:true});
            return res.json(updateD);
        }
    }

    async deleteDisease(req, res, next){
        const {id} = req.body;
        const deleteD = await model.disease.findByIdAndDelete(id);
        return res.json(deleteD);
    }

    async deleteDiseaseInfo(req, res, next){
        const {id} = req.body;
        const deleteD = await model.diseaseinfo.findByIdAndDelete(id);
        return res.json(deleteD);
    }
}

module.exports = new diseaseController();