const ApiError = require("../error/ApiError");
const model = require('../module/module');

class peopleController {
    async search(req, res, next){
        let {fish} = req.body
        
        let patients
        if(fish.length>1){     
            patients = await model.people.find({fish: { $regex : '.*'+ fish + '.*' }}).sort({ _id: -1 })
        }
        return res.json(patients)
    }

    async addPeople(req, res, next){
        const { territoryId, cityorvillageId, districtId, neighborhoodId, streetId, objectId, houseId, apartmentId, sex, birthday, fish, whoAdd } = req.body;

        if (!territoryId) {
            return next(ApiError.badRequest('Xonodon tanlanmadi'));
        }else if (!cityorvillageId) {
            return next(ApiError.badRequest('Shahar yoki Qishloq tanlanmadi'));
        }else if (!districtId) {
            return next(ApiError.badRequest('Tuman tanlanmadi'));
        }else if (!neighborhoodId) {
            return next(ApiError.badRequest('MFY tanlanmadi'));
        }else if (!streetId) {
            return next(ApiError.badRequest('Ko`cha tanlanmadi'));
        }else if (!objectId) {
            return next(ApiError.badRequest('Objekt tanlanmadi'));
        }else if (!houseId) {
            return next(ApiError.badRequest('Uy tanlanmadi'));
        }else if (!apartmentId) {
            return next(ApiError.badRequest('Xonodon tanlanmadi'));
        } else if (!sex) {
            return next(ApiError.badRequest('Jinsi tanlanmadi'));
        } else if (!birthday) {
            return next(ApiError.badRequest('Tug`ilgan yili tanlanmadi'));
        } else if (!fish) {
            return next(ApiError.badRequest('F.I.SH yozilmadi'));
        }

        const titlefind = await model.people.findOne({territoryId, cityorvillageId, districtId, neighborhoodId, streetId, objectId, houseId, apartmentId, sex, birthday, fish});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Yashovchi mavjud'));
        } else {
            const findApartment = await model.apartment.findById(apartmentId);
            if (findApartment){
                // console.log(findApartment)
                const addP = await model.people.create({
                    territoryId, 
                    cityorvillageId, 
                    districtId, 
                    neighborhoodId, 
                    streetId, 
                    objectId, 
                    houseId, 
                    entranceId:findApartment.entranceId,
                    floorId:findApartment.floorId,
                    sideId:findApartment.sideId,
                    apartmentId, 
                    sex, 
                    birthday, 
                    fish, 
                    whoAdd});
                return res.json(addP);
            }
        }
    }

    async fetchPeople(req, res, next){
        const { territoryId, cityorvillageId, districtId, neighborhoodId, streetId, objectId, houseId, apartmentId } = req.body;
        // console.log(req.body)
        if (!territoryId && !districtId && !cityorvillageId && !neighborhoodId && !streetId && !objectId && !houseId && !apartmentId) {
            const fetchP = await model.people.find().sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && !districtId && !cityorvillageId && !neighborhoodId && !streetId && !objectId && !houseId && !apartmentId) {
            const fetchP = await model.people.find({territoryId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && districtId && !cityorvillageId && !neighborhoodId && !streetId && !objectId && !houseId && !apartmentId) {
            const fetchP = await model.people.find({territoryId, districtId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && districtId && cityorvillageId && !neighborhoodId && !streetId && !objectId && !houseId && !apartmentId) {
            const fetchP = await model.people.find({territoryId, districtId, cityorvillageId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && districtId && cityorvillageId && neighborhoodId && !streetId && !objectId && !houseId && !apartmentId) {
            const fetchP = await model.people.find({territoryId, districtId, cityorvillageId, neighborhoodId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && districtId && cityorvillageId && neighborhoodId && streetId && !objectId && !houseId && !apartmentId) {
            const fetchP = await model.people.find({territoryId, districtId, cityorvillageId, neighborhoodId, streetId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && districtId && cityorvillageId && neighborhoodId && streetId && objectId && !houseId && !apartmentId) {
            const fetchP = await model.people.find({territoryId, districtId, cityorvillageId, neighborhoodId, streetId, objectId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && districtId && cityorvillageId && neighborhoodId && streetId && objectId && houseId && !apartmentId) {
            const fetchP = await model.people.find({territoryId, districtId, cityorvillageId, neighborhoodId, streetId, objectId, houseId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        } else  if (territoryId && districtId && cityorvillageId && neighborhoodId && streetId && objectId && houseId && apartmentId) {
            const fetchP = await model.people.find({territoryId, districtId, cityorvillageId, neighborhoodId, streetId, objectId, houseId, apartmentId}).sort({ _id: -1});
            // console.log(fetchA)
            let data = []
            for (let i = 0; i < fetchP.length; i++ ){
                let idTerritory = fetchP[i].territoryId;
                let idCityOrVillage = fetchP[i].cityorvillageId;
                let idDistrict = fetchP[i].districtId;
                let idNeighborhood = fetchP[i].neighborhoodId;
                let idStreet = fetchP[i].streetId;
                let idObject = fetchP[i].objectId;
                let idHouse = fetchP[i].houseId;
                let idApartment = fetchP[i].apartmentId;
                const findTitleTerritory = await model.territory.findById(idTerritory);
                const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
                const findStreet = await model.street.findById(idStreet);
                const findObject = await model.object.findById(idObject);
                const findHouse = await model.house.findById(idHouse);
                const findApartment = await model.apartment.findById(idApartment);

                let idSide = findApartment.sideId;
                let idFloor = findApartment.floorId;
                let idEntrance = findApartment.entranceId;
                
                const findSide = await model.side.findById(idSide);
                const findTitleFloor = await model.floor.findById(idFloor);
                const findTitleEntrance = await model.entrance.findById(idEntrance);


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
        
                let apartmentTitle = ''
                if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                    apartmentTitle = ''
                }else{
                    apartmentTitle = findApartment.title
                }

                let obj = JSON.stringify(fetchP[i])
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
                obj["apartmentTitle"] = `${apartmentTitle}`;
                data.push(obj)
            }
            return res.json(data);
        }

    }

    async fetchAllPeople(req, res, next){
        const fetchP = await model.people.find().sort({ _id: -1});
        // console.log(fetchA)
        let data = []
        for (let i = 0; i < fetchP.length; i++ ){
            let idTerritory = fetchP[i].territoryId;
            let idCityOrVillage = fetchP[i].cityorvillageId;
            let idDistrict = fetchP[i].districtId;
            let idNeighborhood = fetchP[i].neighborhoodId;
            let idStreet = fetchP[i].streetId;
            let idObject = fetchP[i].objectId;
            let idHouse = fetchP[i].houseId;
            let idApartment = fetchP[i].apartmentId;
            const findTitleTerritory = await model.territory.findById(idTerritory);
            const findTitleCityOrVillage = await model.cityorvillage.findById(idCityOrVillage);
            const findTitleDistrict = await model.district.findById(idDistrict);
            const findTitleNeighborhood = await model.neighborhood.findById(idNeighborhood);
            const findStreet = await model.street.findById(idStreet);
            const findObject = await model.object.findById(idObject);
            const findHouse = await model.house.findById(idHouse);
            const findApartment = await model.apartment.findById(idApartment);

            let idSide = findApartment.sideId;
            let idFloor = findApartment.floorId;
            let idEntrance = findApartment.entranceId;
            
            const findSide = await model.side.findById(idSide);
            const findTitleFloor = await model.floor.findById(idFloor);
            const findTitleEntrance = await model.entrance.findById(idEntrance);


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
    
            let apartmentTitle = ''
            if (!findApartment || findApartment == undefined || findApartment == null || findApartment == ''){
                apartmentTitle = ''
            }else{
                apartmentTitle = findApartment.title
            }

            let obj = JSON.stringify(fetchP[i])
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
            obj["apartmentTitle"] = `${apartmentTitle}`;
            data.push(obj)
        }
        return res.json(data);
    }
    
    async getPeople(req, res, next){
        const {id} = req.params;
        const getP = await model.people.findById(id);
        return res.json(getP)
    }

    async updatePeople(req, res, next){
        const {id, territoryId, cityorvillageId, districtId, neighborhoodId, streetId, objectId, houseId, apartmentId, sex, birthday, fish, whoAdd} = req.body
        
        if (!territoryId) {
            return next(ApiError.badRequest('Xonodon tanlanmadi'));
        }else if (!cityorvillageId) {
            return next(ApiError.badRequest('Shahar yoki Qishloq tanlanmadi'));
        }else if (!districtId) {
            return next(ApiError.badRequest('Tuman tanlanmadi'));
        }else if (!neighborhoodId) {
            return next(ApiError.badRequest('MFY tanlanmadi'));
        }else if (!streetId) {
            return next(ApiError.badRequest('Ko`cha tanlanmadi'));
        }else if (!objectId) {
            return next(ApiError.badRequest('Objekt tanlanmadi'));
        }else if (!houseId) {
            return next(ApiError.badRequest('Uy tanlanmadi'));
        }else if (!apartmentId) {
            return next(ApiError.badRequest('Xonodon tanlanmadi'));
        } else if (!sex) {
            return next(ApiError.badRequest('Jinsi tanlanmadi'));
        } else if (!birthday) {
            return next(ApiError.badRequest('Tug`ilgan yili tanlanmadi'));
        } else if (!fish) {
            return next(ApiError.badRequest('F.I.SH yozilmadi'));
        }
        
        const titlefind = await model.people.findOne({ territoryId, cityorvillageId, districtId, neighborhoodId, streetId, objectId, houseId, apartmentId, sex, birthday, fish});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Yashovchi mavjud'));
        } else {
            const updateP = await model.people.findByIdAndUpdate(id, {territoryId, cityorvillageId, districtId, neighborhoodId, streetId, objectId, houseId, apartmentId, sex, birthday, fish, whoAdd},{new:true});
            return res.json(updateP);
        }
    }

    async deletePeople(req, res, next){
        const {id} = req.body;
        const deleteP = await model.people.findByIdAndDelete(id);
        return res.json(deleteP);
    }
}

module.exports = new peopleController();