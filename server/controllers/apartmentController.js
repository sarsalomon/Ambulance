const ApiError = require("../error/ApiError");
const model = require('../module/module');

class apartmentController {
    async addApartment(req, res, next){
        const { districtId, houseId, objectId, floorId, sideId, title, entranceId, whoAdd } = req.body;

        if (!districtId){
            return next(ApiError.badRequest("Tuman tanlanmadi"));
        }else if (!houseId){
            return next(ApiError.badRequest("Uy tanlanmadi"));
        }else if (!objectId){
            return next(ApiError.badRequest("Obyekt tanlanmadi"));
        }else if (!floorId){
            return next(ApiError.badRequest("Qavat tanlanmadi"));
        }else if (!sideId){
            return next(ApiError.badRequest("Taraf tanlanmadi"));
        }else if (!title){
            return next(ApiError.badRequest("Nomi yozilmadi"));
        }else if (!entranceId){
            return next(ApiError.badRequest("Qavat tanlanmadi"));
        }

        const titlefind = await model.apartment.findOne({districtId, houseId, objectId, floorId, sideId, title, entranceId,});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Xonadon mavjud'));
        } else {
            const addA = await model.apartment.create({districtId, houseId, objectId, floorId, sideId, title, entranceId, whoAdd});
            return res.json(addA);
        }
    }

    async fetchApartment(req, res, next){
        const { districtId, houseId, objectId } = req.body;
        // console.log(req.body)
        if (!districtId && !houseId && !objectId) {
            const fetchA = await model.apartment.find().sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchA.length; i++ ){
                let idDistrict = fetchA[i].districtId;
                let idEntrance = fetchA[i].entranceId;
                let idFloor = fetchA[i].floorId;
                let idSide = fetchA[i].sideId;
                let idObject = fetchA[i].objectId;
                let idHouse = fetchA[i].houseId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleEntrance = await model.entrance.findById(idEntrance);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findSide = await model.side.findById(idSide);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let entranceTitle = ''
                if (!findTitleEntrance || findTitleEntrance == undefined || findTitleEntrance == null || findTitleEntrance == ''){
                    entranceTitle = ''
                }else{
                    entranceTitle = findTitleEntrance.title
                }
    
                let floorTitle = ''
                if (!findTitleFloor || findTitleFloor == undefined || findTitleFloor == null || findTitleFloor == ''){
                    floorTitle = ''
                }else{
                    floorTitle = findTitleFloor.title
                }
    
                let sideTitle = ''
                if (!findSide || findSide == undefined || findSide == null || findSide == ''){
                    sideTitle = ''
                }else{
                    sideTitle = findSide.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
                let houseTitle = ''
                if (!findHouse || findHouse == undefined || findHouse == null || findHouse == ''){
                    houseTitle = ''
                }else{
                    houseTitle = findHouse.title
                }
    
                let obj = JSON.stringify(fetchA[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["entranceTitle"] = `${entranceTitle}`;
                obj["floorTitle"] = `${floorTitle}`;
                obj["sideTitle"] = `${sideTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["houseTitle"] = `${houseTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else if (districtId && !houseId && !houseId) {
            const fetchA = await model.apartment.find({districtId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchA.length; i++ ){
                let idDistrict = fetchA[i].districtId;
                let idEntrance = fetchA[i].entranceId;
                let idFloor = fetchA[i].floorId;
                let idSide = fetchA[i].sideId;
                let idObject = fetchA[i].objectId;
                let idHouse = fetchA[i].houseId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleEntrance = await model.entrance.findById(idEntrance);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findSide = await model.side.findById(idSide);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let entranceTitle = ''
                if (!findTitleEntrance || findTitleEntrance == undefined || findTitleEntrance == null || findTitleEntrance == ''){
                    entranceTitle = ''
                }else{
                    entranceTitle = findTitleEntrance.title
                }
    
                let floorTitle = ''
                if (!findTitleFloor || findTitleFloor == undefined || findTitleFloor == null || findTitleFloor == ''){
                    floorTitle = ''
                }else{
                    floorTitle = findTitleFloor.title
                }
    
                let sideTitle = ''
                if (!findSide || findSide == undefined || findSide == null || findSide == ''){
                    sideTitle = ''
                }else{
                    sideTitle = findSide.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
                let houseTitle = ''
                if (!findHouse || findHouse == undefined || findHouse == null || findHouse == ''){
                    houseTitle = ''
                }else{
                    houseTitle = findHouse.title
                }
    
                let obj = JSON.stringify(fetchA[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["entranceTitle"] = `${entranceTitle}`;
                obj["floorTitle"] = `${floorTitle}`;
                obj["sideTitle"] = `${sideTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["houseTitle"] = `${houseTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else if (districtId && objectId && !houseId) {
            const fetchA = await model.apartment.find({districtId, objectId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchA.length; i++ ){
                let idDistrict = fetchA[i].districtId;
                let idEntrance = fetchA[i].entranceId;
                let idFloor = fetchA[i].floorId;
                let idSide = fetchA[i].sideId;
                let idObject = fetchA[i].objectId;
                let idHouse = fetchA[i].houseId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleEntrance = await model.entrance.findById(idEntrance);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findSide = await model.side.findById(idSide);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let entranceTitle = ''
                if (!findTitleEntrance || findTitleEntrance == undefined || findTitleEntrance == null || findTitleEntrance == ''){
                    entranceTitle = ''
                }else{
                    entranceTitle = findTitleEntrance.title
                }
    
                let floorTitle = ''
                if (!findTitleFloor || findTitleFloor == undefined || findTitleFloor == null || findTitleFloor == ''){
                    floorTitle = ''
                }else{
                    floorTitle = findTitleFloor.title
                }
    
                let sideTitle = ''
                if (!findSide || findSide == undefined || findSide == null || findSide == ''){
                    sideTitle = ''
                }else{
                    sideTitle = findSide.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
                let houseTitle = ''
                if (!findHouse || findHouse == undefined || findHouse == null || findHouse == ''){
                    houseTitle = ''
                }else{
                    houseTitle = findHouse.title
                }
    
                let obj = JSON.stringify(fetchA[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["entranceTitle"] = `${entranceTitle}`;
                obj["floorTitle"] = `${floorTitle}`;
                obj["sideTitle"] = `${sideTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["houseTitle"] = `${houseTitle}`;
                data.push(obj)
            }
            return res.json(data);
        }  else if (districtId && houseId && !objectId) {
            const fetchA = await model.apartment.find({districtId, houseId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchA.length; i++ ){
                let idDistrict = fetchA[i].districtId;
                let idEntrance = fetchA[i].entranceId;
                let idFloor = fetchA[i].floorId;
                let idSide = fetchA[i].sideId;
                let idObject = fetchA[i].objectId;
                let idHouse = fetchA[i].houseId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleEntrance = await model.entrance.findById(idEntrance);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findSide = await model.side.findById(idSide);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let entranceTitle = ''
                if (!findTitleEntrance || findTitleEntrance == undefined || findTitleEntrance == null || findTitleEntrance == ''){
                    entranceTitle = ''
                }else{
                    entranceTitle = findTitleEntrance.title
                }
    
                let floorTitle = ''
                if (!findTitleFloor || findTitleFloor == undefined || findTitleFloor == null || findTitleFloor == ''){
                    floorTitle = ''
                }else{
                    floorTitle = findTitleFloor.title
                }
    
                let sideTitle = ''
                if (!findSide || findSide == undefined || findSide == null || findSide == ''){
                    sideTitle = ''
                }else{
                    sideTitle = findSide.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
                let houseTitle = ''
                if (!findHouse || findHouse == undefined || findHouse == null || findHouse == ''){
                    houseTitle = ''
                }else{
                    houseTitle = findHouse.title
                }
    
                let obj = JSON.stringify(fetchA[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["entranceTitle"] = `${entranceTitle}`;
                obj["floorTitle"] = `${floorTitle}`;
                obj["sideTitle"] = `${sideTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["houseTitle"] = `${houseTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else if (districtId && houseId && objectId) {
            const fetchA = await model.apartment.find({districtId, houseId, objectId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchA.length; i++ ){
                let idDistrict = fetchA[i].districtId;
                let idEntrance = fetchA[i].entranceId;
                let idFloor = fetchA[i].floorId;
                let idSide = fetchA[i].sideId;
                let idObject = fetchA[i].objectId;
                let idHouse = fetchA[i].houseId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleEntrance = await model.entrance.findById(idEntrance);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findSide = await model.side.findById(idSide);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let entranceTitle = ''
                if (!findTitleEntrance || findTitleEntrance == undefined || findTitleEntrance == null || findTitleEntrance == ''){
                    entranceTitle = ''
                }else{
                    entranceTitle = findTitleEntrance.title
                }
    
                let floorTitle = ''
                if (!findTitleFloor || findTitleFloor == undefined || findTitleFloor == null || findTitleFloor == ''){
                    floorTitle = ''
                }else{
                    floorTitle = findTitleFloor.title
                }
    
                let sideTitle = ''
                if (!findSide || findSide == undefined || findSide == null || findSide == ''){
                    sideTitle = ''
                }else{
                    sideTitle = findSide.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
                let houseTitle = ''
                if (!findHouse || findHouse == undefined || findHouse == null || findHouse == ''){
                    houseTitle = ''
                }else{
                    houseTitle = findHouse.title
                }
    
                let obj = JSON.stringify(fetchA[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["entranceTitle"] = `${entranceTitle}`;
                obj["floorTitle"] = `${floorTitle}`;
                obj["sideTitle"] = `${sideTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["houseTitle"] = `${houseTitle}`;
                data.push(obj)
            }
            return res.json(data);
        }
    }

    async fetchAllApartment(req, res, next){
        const fetchA = await model.apartment.find().sort({ _id: -1});
        let data = []
        for (let i = 0; i < fetchA.length; i++ ){
            let idTerritory = fetchA[i].territoryId;
            let idCityOrVillage = fetchA[i].cityorvillageId;
            let idDistrict = fetchA[i].districtId;
            let idEntrance = fetchA[i].entranceId;
            let idFloor = fetchA[i].floorId;
            let idNeighborhood = fetchA[i].neighborhoodId;
            let idSide = fetchA[i].sideId;
            let idStreet = fetchA[i].streetId;
            let idObject = fetchA[i].objectId;
            let idHouse = fetchA[i].houseId;
            const findTitleTerritory = await model.territory.findById(idTerritory);
            const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
            const findTitleDistrict = await model.district.findById(idDistrict);
            const findTitleEntrance = await model.entrance.findById(idEntrance);
            const findTitleFloor = await model.floor.findById(idFloor);
            const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
            const findSide = await model.side.findById(idSide);
            const findStreet = await model.street.findById(idStreet);
            const findObject = await model.object.findById(idObject);
            const findHouse = await model.house.findById(idHouse);

            let territoryTitle = ''
            if (!findTitleTerritory || findTitleTerritory == undefined || findTitleTerritory == null || findTitleTerritory == ''){
                territoryTitle = ''
            }else {
                territoryTitle = findTitleTerritory.title
            }

            let cityorvillageTitle = ''
            if (!findTitleCityOrVillage || findTitleCityOrVillage == undefined || findTitleCityOrVillage == null || findTitleCityOrVillage == ''){
                cityorvillageTitle = ''
            }else{
                cityorvillageTitle = findTitleCityOrVillage.title
            }

            let districtTitle = ''
            if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                districtTitle = ''
            }else{
                districtTitle = findTitleDistrict.title
            }

            let entranceTitle = ''
            if (!findTitleEntrance || findTitleEntrance == undefined || findTitleEntrance == null || findTitleEntrance == ''){
                entranceTitle = ''
            }else{
                entranceTitle = findTitleEntrance.title
            }

            let floorTitle = ''
            if (!findTitleFloor || findTitleFloor == undefined || findTitleFloor == null || findTitleFloor == ''){
                floorTitle = ''
            }else{
                floorTitle = findTitleFloor.title
            }

            let neighborhoodTitle = ''
            if (!findTitleNeighborhood || findTitleNeighborhood == undefined || findTitleNeighborhood == null || findTitleNeighborhood == ''){
                neighborhoodTitle = ''
            }else{
                neighborhoodTitle = findTitleNeighborhood.title
            }

            let sideTitle = ''
            if (!findSide || findSide == undefined || findSide == null || findSide == ''){
                sideTitle = ''
            }else{
                sideTitle = findSide.title
            }

            let streetTitle = ''
            if (!findStreet || findStreet == undefined || findStreet == null || findStreet == ''){
                streetTitle = ''
            }else{
                streetTitle = findStreet.title
            }

            let objectTitle = ''
            if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                objectTitle = ''
            }else{
                objectTitle = findObject.title
            }

            let houseTitle = ''
            if (!findHouse || findHouse == undefined || findHouse == null || findHouse == ''){
                houseTitle = ''
            }else{
                houseTitle = findHouse.title
            }

            let obj = JSON.stringify(fetchA[i])
            obj = JSON.parse(obj)
            obj["territoryTitle"] = `${territoryTitle}`;
            obj["cityorvillageTitle"] = `${cityorvillageTitle}`;
            obj["districtTitle"] = `${districtTitle}`;
            obj["entranceTitle"] = `${entranceTitle}`;
            obj["floorTitle"] = `${floorTitle}`;
            obj["neighborhoodTitle"] = `${neighborhoodTitle}`;
            obj["streetTitle"] = `${streetTitle}`;
            obj["sideTitle"] = `${sideTitle}`;
            obj["objectTitle"] = `${objectTitle}`;
            obj["houseTitle"] = `${houseTitle}`;
            data.push(obj)
        }
        return res.json(data);
    }

    async getApartment(req, res, next){
        const {id} = req.params;
        const getA = await model.apartment.findById(id);
        if (getA == null || getA == undefined) {
            return next(ApiError.badRequest('Bemorni yashash xonodoni tanlanmagan'));
        } else {
            return res.json(getA)
        }
    }

    async updateApartment(req, res, next){
        const {id, districtId, houseId, objectId, floorId, sideId, title, entranceId, whoAdd} = req.body

        if (!districtId){
            return next(ApiError.badRequest("Tuman tanlanmadi"));
        }else if (!houseId){
            return next(ApiError.badRequest("Uy tanlanmadi"));
        }else if (!objectId){
            return next(ApiError.badRequest("Obyekt tanlanmadi"));
        }else if (!floorId){
            return next(ApiError.badRequest("Qavat tanlanmadi"));
        }else if (!sideId){
            return next(ApiError.badRequest("Taraf tanlanmadi"));
        }else if (!title){
            return next(ApiError.badRequest("Nomi yozilmadi"));
        }else if (!entranceId){
            return next(ApiError.badRequest("Qavat tanlanmadi"));
        }

        const titlefind = await model.apartment.findOne({districtId, houseId, objectId, floorId, sideId, title, entranceId});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Xonadon mavjud'));
        } else {
            const updateA = await model.apartment.findByIdAndUpdate(id, {districtId, houseId, objectId, floorId, sideId, title, entranceId, whoAdd},{new:true});
            return res.json(updateA);
        }
    }

    async deleteApartment(req, res, next){
        const {id} = req.body;
        const deleteA = await model.apartment.findByIdAndDelete(id);
        return res.json(deleteA);
    }
}

module.exports = new apartmentController();