const { SMTD } = require("../bot/tg");
const ApiError = require("../error/ApiError");
const model = require('../module/module');

class callController {
    async addCall(req, res, next){
        const { territoryId, cityorvillageId, districtId, neighborhoodId, streetId, houseId, apartmentId, entranceId, floorId, sideId, peopleId, operatorId, driverId, latitude, longitude, type } = req.body;
        console.log(req.body)
        if (!operatorId) {
            return next(ApiError.badRequest('Operator tanlanmadi'));
        } else if (!apartmentId && type != 3) {
            return next(ApiError.badRequest('Uy tanlanmadi'));
        } else if (!driverId) {
            return next(ApiError.badRequest('Haydovchi tanlanmadi'));
        }

        if (type == 1) {
            const getApartment = await model.apartment.findById({_id:apartmentId}).sort({ _id: -1 });
            if (getApartment) {
                const condidateC = await model.call.findOne({territoryId, cityorvillageId, districtId, neighborhoodId, streetId, houseId, apartmentId, entranceId:getApartment.entranceId, floorId:getApartment.floorId, sideId:getApartment.sideId, peopleId}).sort({ _id: -1 });
                if (condidateC) {
                    return next(ApiError.badRequest('Boshqa Tez Tibbiy Yordam Bemorga yuborildi'));
                } else { 
                    const condidate = await model.call.findOne({territoryId, cityorvillageId, districtId, neighborhoodId, streetId, houseId, apartmentId, entranceId:getApartment.entranceId, floorId:getApartment.floorId, sideId:getApartment.sideId, peopleId, driverId}).sort({ _id: -1 });
        
                    if (condidate) {
                        return next(ApiError.badRequest('Tez Tibbiy Yordam Manzilga yuborildi'));
                    } else {
                        let today = new Date();
                        let dd = today.getDate();
                        let mm = today.getMonth()+1; 
                        let yyyy = today.getFullYear();
                        let hours = today.getHours();
                        let minutes = today.getMinutes();
                        let secondes = today.getSeconds();
                
                        if(dd<10) 
                        {
                            dd='0'+dd;
                        } 
                        
                        if(mm<10) 
                        {
                            mm='0'+mm;
                        } 
                        today = dd+'-'+mm+'-'+ yyyy;
                        let timeNow = hours+':'+minutes+':'+secondes 
                
                        const getqueue = await model.call.findOne({driverId:driverId}).sort({ _id: -1 });
                
                        let queues
                        if(getqueue === null ){
                            queues = 1
                        }else{
                            queues = Number(getqueue.queue) + Number(1)
                        }
                        
                        const fetchDriver = await model.driver.findById(driverId);
                        if (fetchDriver) {
                            const fetchDriverC = await model.driver.findById(driverId);
                            if (fetchDriverC.chatId == '') {
                                return next(ApiError.badRequest('Hali botni ishga tushirmadi'));
                            } else {
                                const fetchHouse = await model.house.findById(houseId);
                                if (fetchHouse){
                                    console.log(driverId)
                                    const fetchDriverC = await model.call.findById(driverId);
                                    console.log(fetchDriverC)
                                    if (fetchDriverC != null && fetchDriverC.length > 0) {
                                        const addC = await model.call.create({
                                            territoryId, 
                                            cityorvillageId,
                                            districtId, 
                                            neighborhoodId, 
                                            streetId, 
                                            houseId, 
                                            apartmentId,
                                            entranceId:getApartment.entranceId, 
                                            floorId:getApartment.floorId, 
                                            sideId:getApartment.sideId, 
                                            peopleId, 
                                            operatorId, 
                                            driverId, 
                                            elatitude:fetchHouse.latitude, 
                                            elongitude:fetchHouse.longitude, 
                                            calldate:today, 
                                            callTime:timeNow,
                                            queue:queues, 
                                            type, 
                                            send: 0,
                                            status:0
                                        });
                                        if (addC){
                                            SMTD(fetchDriver.chatId,String(addC._id), '0')
                                            return res.json(addC);
                                        }else{
                                            return next(ApiError.badRequest(`Qo'shilmadi`));
                                        }
                                    } else {
                                        const addC = await model.call.create({
                                            territoryId, 
                                            cityorvillageId,
                                            districtId, 
                                            neighborhoodId, 
                                            streetId, 
                                            houseId, 
                                            apartmentId,
                                            entranceId:getApartment.entranceId, 
                                            floorId:getApartment.floorId, 
                                            sideId:getApartment.sideId, 
                                            peopleId, 
                                            operatorId, 
                                            driverId, 
                                            elatitude:fetchHouse.latitude, 
                                            elongitude:fetchHouse.longitude, 
                                            calldate:today, 
                                            callTime:timeNow,
                                            queue:queues, 
                                            type, 
                                            send: 1,
                                            status:0
                                        });
                                        if (addC){
                                            SMTD(fetchDriver.chatId,String(addC._id), '0')
                                            return res.json(addC);
                                        }else{
                                            return next(ApiError.badRequest(`Qo'shilmadi`));
                                        }
                                    }
        
                                }else{
                                    return next(ApiError.badRequest('Uy topilmadi'));
                                }
                            }
                        }else{
                            return next(ApiError.badRequest('Haydovchi topilmadi'));
                        }
                    }
                }
                }
        } else if (type == 2) {
            const condidateC = await model.call.findOne({territoryId, cityorvillageId, districtId, neighborhoodId, streetId, houseId, apartmentId, entranceId, floorId, sideId, peopleId}).sort({ _id: -1 });
            if (condidateC) {
                return next(ApiError.badRequest('Boshqa Tez Tibbiy Yordam Bemorga yuborildi'));
            } else {
                const condidate = await model.call.findOne({territoryId, cityorvillageId, districtId, neighborhoodId, streetId, houseId, apartmentId, entranceId, floorId, sideId, peopleId, driverId}).sort({ _id: -1 });
                if (condidate) {
                    return next(ApiError.badRequest('Tez Tibbiy Yordam Bemorga yuborildi'));
                } else {
                    let today = new Date();
                    let dd = today.getDate();
                    let mm = today.getMonth()+1; 
                    let yyyy = today.getFullYear();
                    let hours = today.getHours();
                    let minutes = today.getMinutes();
                    let secondes = today.getSeconds();
            
                    if(dd<10) 
                    {
                        dd='0'+dd;
                    } 
                    
                    if(mm<10) 
                    {
                        mm='0'+mm;
                    } 
                    today = dd+'-'+mm+'-'+ yyyy;
                    let timeNow = hours+':'+minutes+':'+secondes 
            
                    const getqueue = await model.call.findOne({driverId:driverId}).sort({ _id: -1 });
            
                    let queues
                    if(getqueue === null ){
                        queues = 1
                    }else{
                        queues = Number(getqueue.queue) + Number(1)
                    }
                    
                    const fetchDriver = await model.driver.findById(driverId);
                    if (fetchDriver) {
                        const fetchDriverC = await model.driver.findById(driverId);
                        if (fetchDriverC.chatId == '') {
                            return next(ApiError.badRequest('Hali botni ishga tushirmadi'));
                        } else {
                            const fetchHouse = await model.house.findById(houseId);
                            console.log(fetchHouse)
                            if (fetchHouse){
                                const fetchApartmnet = await model.apartment.findById(apartmentId);
                                if (fetchApartmnet) {
                                    const fetchDriverC = await model.call.find({driverId});
                                    if (fetchDriverC.length > 0) {
                                        const addC = await model.call.create({
                                            territoryId, 
                                            cityorvillageId, 
                                            districtId, 
                                            neighborhoodId, 
                                            streetId, 
                                            houseId, 
                                            apartmentId, 
                                            entranceId:fetchApartmnet.entranceId, 
                                            floorId:fetchApartmnet.floorId, 
                                            sideId:fetchApartmnet.sideId, 
                                            peopleId, 
                                            operatorId, 
                                            driverId,
                                            doctorId:'',
                                            elatitude:fetchHouse.latitude, 
                                            elongitude:fetchHouse.longitude,
                                            calldate:today, 
                                            callTime:timeNow, 
                                            queue:queues,
                                            type,
                                            send: 0,
                                            status:0
                                        });
                                        if (addC){
                                            SMTD(fetchDriver.chatId,String(addC._id), '0')
                                            return res.json(addC);
                                        }else{
                                            return next(ApiError.badRequest(`Qo'shilmadi`));
                                        }
                                    }else {
                                        const addC = await model.call.create({
                                            territoryId, 
                                            cityorvillageId, 
                                            districtId, 
                                            neighborhoodId, 
                                            streetId, 
                                            houseId, 
                                            apartmentId, 
                                            entranceId:fetchApartmnet.entranceId, 
                                            floorId:fetchApartmnet.floorId, 
                                            sideId:fetchApartmnet.sideId, 
                                            peopleId, 
                                            operatorId, 
                                            driverId,
                                            doctorId:'',
                                            elatitude:fetchHouse.latitude, 
                                            elongitude:fetchHouse.longitude,
                                            calldate:today, 
                                            callTime:timeNow, 
                                            queue:queues,
                                            type,
                                            send: 1,
                                            status:0
                                        });
                                        if (addC){
                                            SMTD(fetchDriver.chatId,String(addC._id), '0')
                                            return res.json(addC);
                                        }else{
                                            return next(ApiError.badRequest(`Qo'shilmadi`));
                                        }
                                    }
        
                                }else{
                                    return next(ApiError.badRequest('Xonodon topilmadi'));
                                }
                            }else{
                                return next(ApiError.badRequest('Uy topilmadi'));
                            }
                        }
                    }else{
                        return next(ApiError.badRequest('Haydovchi topilmadi'));
                    }
                }
            }
        } else if (type == 3) {
                const condidate = await model.call.findOne({territoryId:"", cityorvillageId:"", districtId:"", neighborhoodId:"", streetId:"", houseId:"", apartmentId:"", entranceId:"", floorId:"", sideId:"", peopleId:"", operatorId:"", driverId}).sort({ _id: -1 });
        
                if (condidate) {
                    return next(ApiError.badRequest('Tez Tibbiy Yordam Manzilga yuborildi'));
                } else {
                    let today = new Date();
                    let dd = today.getDate();
                    let mm = today.getMonth()+1; 
                    let yyyy = today.getFullYear();
                    let hours = today.getHours();
                    let minutes = today.getMinutes();
                    let secondes = today.getSeconds();
            
                    if(dd<10) 
                    {
                        dd='0'+dd;
                    } 
                    
                    if(mm<10) 
                    {
                        mm='0'+mm;
                    } 
                    today = dd+'-'+mm+'-'+ yyyy;
                    let timeNow = hours+':'+minutes+':'+secondes 
            
                    const getqueue = await model.call.findOne({driverId:driverId}).sort({ _id: -1 });
            
                    let queues
                    if(getqueue === null ){
                        queues = 1
                    }else{
                        queues = Number(getqueue.queue) + Number(1)
                    }
                    
                    const fetchDriver = await model.driver.findById(driverId);
                    if (fetchDriver) {
                        const fetchDriverC = await model.call.find({driverId});
                        if (fetchDriverC.chatId == '') {
                            return next(ApiError.badRequest('Hali botni ishga tushirmadi'));
                        } else {
                            const fetchDriverC = await model.call.find({driverId});
                            if (fetchDriverC.length > 0) {
                                const addC = await model.call.create({
                                    territoryId, 
                                    cityorvillageId, 
                                    districtId, 
                                    neighborhoodId, 
                                    streetId, 
                                    houseId, 
                                    apartmentId, 
                                    entranceId, 
                                    floorId, 
                                    sideId, 
                                    peopleId, 
                                    operatorId, 
                                    driverId,
                                    doctorId:'',
                                    elatitude: latitude, 
                                    elongitude: longitude,
                                    calldate:today, 
                                    callTime:timeNow, 
                                    queue:queues,
                                    type,
                                    send: 0,
                                    status:0
                                });
                                if (addC){
                                    SMTD(fetchDriver.chatId,String(addC._id), '0')
                                    return res.json(addC);
                                }else{
                                    return next(ApiError.badRequest(`Qo'shilmadi`));
                                }
                            } else {
                                const addC = await model.call.create({
                                    territoryId, 
                                    cityorvillageId, 
                                    districtId, 
                                    neighborhoodId, 
                                    streetId, 
                                    houseId, 
                                    apartmentId, 
                                    entranceId, 
                                    floorId, 
                                    sideId, 
                                    peopleId, 
                                    operatorId, 
                                    driverId,
                                    doctorId:'',
                                    elatitude: latitude, 
                                    elongitude: longitude,
                                    calldate:today, 
                                    callTime:timeNow, 
                                    queue:queues,
                                    type,
                                    send: 1,
                                    status:0
                                });
                                if (addC){
                                    SMTD(fetchDriver.chatId,String(addC._id), '0')
                                    return res.json(addC);
                                }else{
                                    return next(ApiError.badRequest(`Qo'shilmadi`));
                                }
                            }
                        }
                    }else{
                        return next(ApiError.badRequest('Haydovchi topilmadi'));
                    }
                }
        }
    }

    async fetchCall(req, res, next){
        const fetchC = await model.call.find().sort({ _id: 1});
        return res.json(fetchC);
    }

    async fetchAllCall(req, res, next){
        const fetchC = await model.call.find().sort({ _id: 1});
        return res.json(fetchC);
    }

    async getCall(req, res, next){
        const {id} = req.params;
        const getC = await model.call.findById(id);
        return res.json(getC)
    }

    async updateCall(req, res, next){
        const {id, operatorId, doctorId, driverId, diseaseId, startTime, endTime, comment, calldate} = req.body
        if (!title) {
            return next(ApiError.badRequest('Qong`iroq nomi yozilmagan'));
        }
        const titlefind = await model.call.findOne({title});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Qong`iroq mavjud'));
        } else {
            const updateC = await model.call.findByIdAndUpdate(id, {operatorId, doctorId, driverId, diseaseId, startTime, endTime, comment, calldate},{new:true});
            return res.json(updateC);
        }
    }

    async deleteCall(req, res, next){
        const {id} = req.body;
        const deleteC = await model.call.findByIdAndDelete(id);
        return res.json(deleteC);
    }
}

module.exports = new callController();