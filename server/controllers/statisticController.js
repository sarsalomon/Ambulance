const ApiError = require("../error/ApiError");
const model = require('../module/module');

class statisticController {
    async fetchStatistic(req, res, next){
        const fetchS = await model.call.find().sort({ _id: -1});
        let data = []
        for (let i = 0; i < fetchS.length; i++ ){
            let idDistrict = fetchS[i].districtId;
            let idHouse = fetchS[i].houseId;
            let idApartment = fetchS[i].apartmentId;
            let idEntrance = fetchS[i].entranceId;
            let idFloor = fetchS[i].floorId;
            let idSide = fetchS[i].sideId;
            let idDriver = fetchS[i].driverId;
            let idDisease = fetchS[i].diseaseId;
            let idDiseaseInfo = fetchS[i].diseaseInfoId;
            let idOperator = fetchS[i].operatorId;
            const findTitleDistrict = await model.district.findById(idDistrict);
            const findHouse = await model.house.findById(idHouse);
            const findApartment = await model.apartment.findById(idApartment);
            const findTitleEntrance = await model.entrance.findById(idEntrance);
            const findTitleFloor = await model.floor.findById(idFloor);
            const findSide = await model.side.findById(idSide);
            const findDriver = await model.driver.findById(idDriver);
            const findDiasease = await model.disease.findById(idDisease);
            const findDiseaseInfo = await model.diseaseinfo.findById(idDiseaseInfo);
            const findOperator = await model.user.findById(idOperator);

            let districtTitle = ''
            if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                districtTitle = ''
            }else{
                districtTitle = findTitleDistrict.title
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

            let driverTitle = ''
            if (!findDriver || findDriver == undefined || findDriver == null || findDriver == ''){
                driverTitle = ''
            }else{
                driverTitle = findDriver.title
            }

            let diseaseTitle = ''
            if (!findDiasease || findDiasease == undefined || findDiasease == null || findDiasease == ''){
                diseaseTitle = ''
            }else{
                diseaseTitle = findDiasease.title
            }

            let diseaseInfoTitle = ''
            if (!findDiseaseInfo || findDiseaseInfo == undefined || findDiseaseInfo == null || findDiseaseInfo == ''){
                diseaseInfoTitle = ''
            }else{
                diseaseInfoTitle = findDiseaseInfo.title
            }

            let operatorTitle = ''
            if (!findOperator || findOperator == undefined || findOperator == null || findOperator == ''){
                operatorTitle = ''
            }else{
                operatorTitle = findOperator.name
            }

            let obj = JSON.stringify(fetchS[i])
            obj = JSON.parse(obj)
            obj["districtTitle"] = `${districtTitle}`;
            obj["houseTitle"] = `${houseTitle}`;
            obj["apartmentTitle"] = `${apartmentTitle}`;
            obj["entranceTitle"] = `${entranceTitle}`;
            obj["floorTitle"] = `${floorTitle}`;
            obj["sideTitle"] = `${sideTitle}`;
            obj["driverTitle"] = `${driverTitle}`;
            obj["diseaseTitle"] = `${diseaseTitle}`;
            obj["diseaseInfoTitle"] = `${diseaseInfoTitle}`;
            obj["operatorTitle"] = `${operatorTitle}`;
            data.push(obj)
        }
        return res.json(data);
    }

    async getStatistic(req, res, next){
        const {id} = req.params;
        const getS = await model.call.findById(id);
        return res.json(getS)
    }
}

module.exports = new statisticController();