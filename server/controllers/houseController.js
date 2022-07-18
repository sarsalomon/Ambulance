const ApiError = require("../error/ApiError");
const model = require('../module/module');

class houseController {
    async addHouse(req, res, next){
        const { title, districtId, objectId, entranceCount, floorCount, latitude, longitude, firstdoor, dualityortrinity, normalornot, whoAdd } = req.body;

        if (!title) {
            return next(ApiError.badRequest('Nom yozilmadi'));
        } else if (!districtId) {
            return next(ApiError.badRequest('Tuman tanlanmadi'));
        }else if (!objectId) {
            return next(ApiError.badRequest('Obyekt tanlanmadi'));
        } else if (!entranceCount){
            return next(ApiError.badRequest("Kirish yozilmadi"));
        } else if (!floorCount){
            return next(ApiError.badRequest("Qavat yozilmadi"));
        } else if (!latitude){
            return next(ApiError.badRequest("Kenglik yozilmadi"));
        } else if (!longitude){
            return next(ApiError.badRequest("Uzunligi yozilmadi"));
        } else if (!firstdoor){
            return next(ApiError.badRequest("1-eshik yozilmadi"));
        } else if (!dualityortrinity){
            return next(ApiError.badRequest("Nechtaligi yozilmadi"));
        } else if (!normalornot){
            return next(ApiError.badRequest("nechtaligi yozilmadi"));
        }

        const titlefind = await model.house.findOne({title, districtId, objectId, entranceCount, floorCount, latitude, longitude, firstdoor, dualityortrinity, normalornot});

        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa Uy mavjud'));
        } else {
            if (entranceCount == 1 && floorCount == 1 && dualityortrinity == 2){
                return next(ApiError.badRequest(`Hovli uy yoki Obyekt faqat 1talik bo'ladi`));
            } else if (entranceCount == 1 && floorCount == 1 && dualityortrinity == 3) {
                return next(ApiError.badRequest(`Hovli uy yoki Obyekt faqat 1talik bo'ladi`));
            } else {
                const addH = await model.house.create({title, districtId, objectId, entranceCount, floorCount, latitude, longitude, firstdoor, dualityortrinity, normalornot, whoAdd});
                if (addH) {
                    if (normalornot == 1) {
                        for (let q = 1; q <= entranceCount; q++) {
                            for (let j = 1; j <= floorCount; j++) {
                                if (entranceCount == 1  && floorCount == 1) {
                                    for (let doors = 1; doors <= 1; doors++) {
                                        if (dualityortrinity == 1){
                                            const findEntrance = await model.entrance.findOne({title:q});
                                            const findFloor = await model.floor.findOne({title:j});
                                            const findSide = await model.side.findOne({idNumber:2});
                                            const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:firstdoor});
                                            if (!findA) {
                                                const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:firstdoor, whoAdd});
                                            }
                                        }
                                    }
                                }
                                if (q == 1  && j > 3) {
                                    // console.log('dan: ' + ((q)))
                                    // console.log('gacha: ' + (j * q * 2))
                                        if (dualityortrinity == 2){
                                            for (let doors = firstdoor; doors <= (j * q * 2)+Number(firstdoor)-1; doors++) {
                                                if (doors % 2 == 0) {
                                                    let ong = doors % 2 == 0
                                                    let sid
                                                    if (ong == true) {
                                                        sid = 3
                                                    }
                                                    const findEntrance = await model.entrance.findOne({title:q});
                                                    let qavatopish = ((doors-firstdoor)+1)/2;
                                                    const findFloor = await model.floor.findOne({title:qavatopish});
                                                    const findSide = await model.side.findOne({idNumber:sid});
                                                    const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                    if (!findA) {
                                                        const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                    }
                                                } else {
                                                    let chap = doors % 2 == 0
                                                    let sid
                                                    if (chap == false) {
                                                        sid = 1
                                                    }
                                                    const findEntrance = await model.entrance.findOne({title:q});
                                                    let qavatopish = ((doors-firstdoor)+2)/2;
                                                    const findFloor = await model.floor.findOne({title:qavatopish});
                                                    const findSide = await model.side.findOne({idNumber:sid});
                                                    const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                    if (!findA) {
                                                        const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                    }
                                                }
                                            }
                                        } else if (dualityortrinity == 3) {
                                            for (let doors = firstdoor; doors <= (j * q * 3)+Number(firstdoor)-1; doors++) {
                                                // console.log(doors +" dasdadad")
                                                if (doors % 3 == 0) {
                                                    let ong = doors % 3 == 0
                                                    let sid
                                                    if (ong == true) {
                                                        sid = 3
                                                    }
                                                    let qavatopish = ((doors-firstdoor)+1)/3;
                                                    const findEntrance = await model.entrance.findOne({title:q});
                                                    const findFloor = await model.floor.findOne({title:qavatopish});
                                                    const findSide = await model.side.findOne({idNumber:sid});
                                                    const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                    if (!findA) {
                                                        const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                    }
                                                } else if (doors % 3 == 1) {
                                                    let chap = doors % 3 == 1
                                                    let sid
                                                    if (chap == true) {
                                                        sid = 1
                                                    }
                                                    let qavatopish = ((doors-firstdoor)+3)/3;
                                                    const findEntrance = await model.entrance.findOne({title:q});
                                                    const findFloor = await model.floor.findOne({title:qavatopish});
                                                    const findSide = await model.side.findOne({idNumber:sid});
                                                    const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                    if (!findA) {
                                                        const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                    }
                                                } else if (doors % 3 == 2) {
                                                    let orta = doors % 3 == 2
                                                    let sid
                                                    if (orta == true) {
                                                        sid = 2
                                                    }
                                                    let qavatopish = ((doors-firstdoor)+2)/3;
                                                    const findEntrance = await model.entrance.findOne({title:q});
                                                    const findFloor = await model.floor.findOne({title:qavatopish});
                                                    const findSide = await model.side.findOne({idNumber:sid});
                                                    const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                    if (!findA) {
                                                        const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                    }
                                                }
                                            }
                                        }
                                } else if (q > 1 && j > 3) {
                                    // console.log('boshlanadi: ' + ((q-1)*floorCount))
                                    // console.log('tugidi: ' + (q*floorCount))
                                    if (dualityortrinity == 2){
                                        for (let doors = (((q-1)*floorCount+Number(1))*2)-2+Number(firstdoor); doors <= (q*floorCount*2)+Number(firstdoor)-1; doors++) {
                                            if (doors % 2 == 0) {
                                                let ong = doors % 2 == 0
                                                let sid
                                                if (ong == true) {
                                                    sid = 3
                                                }
                                                const findEntrance = await model.entrance.findOne({title:q});
                                                let qavatopish = ((doors - firstdoor - ((q-1)*floorCount*dualityortrinity))+1)/2;
                                                const findFloor = await model.floor.findOne({title:qavatopish})
                                                const findSide = await model.side.findOne({idNumber:sid});
                                                const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                if (!findA) {
                                                    const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                }
                                            } else {
                                                let chap = doors % 2 == 0
                                                let sid
                                                if (chap == false) {
                                                    sid = 1
                                                }
                                                const findEntrance = await model.entrance.findOne({title:q});
                                                let qavatopish = ((doors - firstdoor - ((q-1)*floorCount*dualityortrinity))+2)/2;
                                                const findFloor = await model.floor.findOne({title:qavatopish})
                                                const findSide = await model.side.findOne({idNumber:sid});
                                                const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                if (!findA) {
                                                    const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                }
                                            }
                                        }
                                    } else if (dualityortrinity == 3) {
                                        for (let doors = (((q-1)*floorCount+Number(1))*3)-3+Number(firstdoor); doors <= (q*floorCount*3)+Number(firstdoor)-1; doors++) {
                                            // console.log(doors)
                                            if (doors % 3 == 0) {
                                                let ong = doors % 3 == 0
                                                let sid
                                                if (ong == true) {
                                                    sid = 3
                                                }
                                                const findEntrance = await model.entrance.findOne({title:q});
                                                let qavatopish = (( doors - firstdoor - ((q-1)*floorCount*dualityortrinity)) + 1) / 3;
                                                const findFloor = await model.floor.findOne({title:qavatopish})
                                                const findSide = await model.side.findOne({idNumber:sid});
                                                const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                if (!findA) {
                                                    const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                }
                                            } else if (doors % 3 == 1) {
                                                let chap = doors % 3 == 1
                                                let sid
                                                if (chap == true) {
                                                    sid = 1
                                                }
                                                const findEntrance = await model.entrance.findOne({title:q});
                                                let qavatopish = ((doors - firstdoor - ((q-1)*floorCount*dualityortrinity))+3)/3;
                                                const findFloor = await model.floor.findOne({title:qavatopish})
                                                const findSide = await model.side.findOne({idNumber:sid});
                                                const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                if (!findA) {
                                                    const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                }
                                            } else if (doors % 3 == 2) {
                                                let orta = doors % 3 == 2
                                                let sid
                                                if (orta == true) {
                                                    sid = 2
                                                }
                                                const findEntrance = await model.entrance.findOne({title:q});
                                                let qavatopish = ((doors - firstdoor - ((q-1)*floorCount*dualityortrinity))+2)/3;
                                                const findFloor = await model.floor.findOne({title:qavatopish})
                                                const findSide = await model.side.findOne({idNumber:sid});
                                                const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                                if (!findA) {
                                                    const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (normalornot == 2) {
                        for (let q = 1; q <= entranceCount; q++) {
                            for (let j = 1; j <= floorCount; j++) {
                                if (q == 1  && j > 3) {
                                    for (let doors = firstdoor; doors <= (q*floorCount*3); doors++) {
                                    // console.log('uy: ' + doors)
                                        if (doors % 3 == 0) {
                                            let ong = doors % 3 == 0
                                            let sid
                                            if (ong == true) {
                                                sid = 3
                                            }
                                            const findEntrance = await model.entrance.findOne({title:q});
                                            let qavatopish = ((doors-firstdoor)+1)/3;
                                            const findFloor = await model.floor.findOne({title:qavatopish})
                                            const findSide = await model.side.findOne({idNumber:sid});
                                            const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                            if (!findA) {
                                                const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                            }
                                        } else if (doors % 3 == 1) {
                                            let chap = doors % 3 == 1
                                            let sid
                                            if (chap == true) {
                                                sid = 1
                                            }
                                            const findEntrance = await model.entrance.findOne({title:q});
                                            let qavatopish = ((doors-firstdoor)+3)/3;
                                            const findFloor = await model.floor.findOne({title:qavatopish})
                                            const findSide = await model.side.findOne({idNumber:sid});
                                            const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                            if (!findA) {
                                                const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                            }
                                        } else if (doors % 3 == 2) {
                                            let orta = doors % 3 == 2
                                            let sid
                                            if (orta == true) {
                                                sid = 2
                                            }
                                            const findEntrance = await model.entrance.findOne({title:q});
                                            let qavatopish = ((doors-firstdoor)+2)/3;
                                            const findFloor = await model.floor.findOne({title:qavatopish})
                                            const findSide = await model.side.findOne({idNumber:sid});
                                            const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                            if (!findA) {
                                                const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                            }
                                        }
                                    }
                                } else if (q > 1  && j > 3 && q < entranceCount) {
                                    let newq
                                    if (q==2) {
                                        newq = q-2;
                                    } else {
                                        newq = q-2;
                                    }
                                    for (let doors = (+firstdoor + +(4*1*3) + +((newq)*4*2)); doors <= (+(4*1*3) + +((q-1)*4*2)); doors++) {
                                        if (doors % 2 == 0) {
                                            let ong = doors % 2 == 0
                                            let sid
                                            if (ong == true) {
                                                sid = 3
                                            }
                                            const findEntrance = await model.entrance.findOne({title:q});
                                            let qavatopish = ((doors-firstdoor - (+(4*1*3) + +(newq*floorCount*2)))+1)/2;
                                            const findFloor = await model.floor.findOne({title:qavatopish})
                                            const findSide = await model.side.findOne({idNumber:sid});
                                            const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                            if (!findA) {
                                                const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                            }
                                        } else {
                                            let chap = doors % 2 == 0
                                            let sid
                                            if (chap == false) {
                                                sid = 1
                                            }
                                            const findEntrance = await model.entrance.findOne({title:q});
                                            let qavatopish = ((doors-firstdoor - (+(4*1*3) + +(newq*floorCount*2)))+2)/2;
                                            // console.log(qavatopish)
                                            const findFloor = await model.floor.findOne({title:qavatopish})
                                            const findSide = await model.side.findOne({idNumber:sid});
                                            const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors});
                                            if (!findA) {
                                                const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:doors, whoAdd});
                                            }
                                        }
                                    }
                                } else if (q == entranceCount && j > 3) {
                                    let qavatopishYangi = 0
                                    for (let doors = (+(4*1*3)+ +((q-2)*4*2) + +firstdoor); doors <= (+(4*1*3) + +(4*1*3) + +((q-2)*4*2)); doors=doors+3) {
                                        // console.log(doors)
                                        qavatopishYangi = +qavatopishYangi+ +1
                                        let TomonYangi = 0
                                        for (let i = doors; i<(Number(doors)+Number(3)); i++) {
                                            // console.log(i + ' :ku')
                                            // console.log(qavatopishYangi + ' :dan')
                                            TomonYangi = +TomonYangi+ +1
                                            // console.log(TomonYangi + ' :qe')
                                            const findEntrance = await model.entrance.findOne({title:q});
                                            // let qavatopish = ((doors - firstdoor - (+(4*1*3)+ +((q-2)*4*2) )) + 1)/3;
                                            const findFloor = await model.floor.findOne({title:String(qavatopishYangi)})
                                            const findSide = await model.side.findOne({idNumber:TomonYangi});
                                            const findA = await model.apartment.findOne({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:i});
                                            if (!findA) {
                                                const addA = await model.apartment.create({districtId, objectId, houseId:addH._id.valueOf(), entranceId:findEntrance._id.valueOf(), floorId:findFloor._id.valueOf(), sideId:findSide._id.valueOf(), title:i, whoAdd});
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return res.json(addH);
                }
            }
        }
    }

    async fetchHouse(req, res, next){
        const { districtId, objectId } = req.body;
        if (!districtId && !objectId) {
            const fetchH = await model.house.find().sort({ _id: -1});
            let data = []
            for (let i = 0; i < fetchH.length; i++ ){
                let idDistrict = fetchH[i].districtId;
                let idObject = fetchH[i].objectId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findObject = await model.object.findById(idObject);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
    
                let obj = JSON.stringify(fetchH[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["dualityortrinity"] = `${fetchH[i].dualityortrinity}`;
                obj["firstdoor"] = `${fetchH[i].firstdoor}`;
                data.push(obj)
            }
            return res.json(data);
        } else if (districtId && !objectId) {
            const fetchH = await model.house.find({districtId}).sort({ title: 1});
            let data = []
            for (let i = 0; i < fetchH.length; i++ ){
                let idDistrict = fetchH[i].districtId;
                let idObject = fetchH[i].objectId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findObject = await model.object.findById(idObject);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
    
                let obj = JSON.stringify(fetchH[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["dualityortrinity"] = `${fetchH[i].dualityortrinity}`;
                obj["firstdoor"] = `${fetchH[i].firstdoor}`;
                data.push(obj)
            }
            return res.json(data);
        } else if (districtId && objectId) {
            const fetchH = await model.house.find({districtId, objectId}).sort({ _id: -1});
            let data = []
            for (let i = 0; i < fetchH.length; i++ ){
                let idDistrict = fetchH[i].districtId;
                let idObject = fetchH[i].objectId;
                const findTitleDistrict = await model.district.findById(idDistrict);
                const findObject = await model.object.findById(idObject);
    
                let districtTitle = ''
                if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                    districtTitle = ''
                }else{
                    districtTitle = findTitleDistrict.title
                }
    
                let objectTitle = ''
                if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                    objectTitle = ''
                }else{
                    objectTitle = findObject.title
                }
    
    
                let obj = JSON.stringify(fetchH[i])
                obj = JSON.parse(obj)
                obj["districtTitle"] = `${districtTitle}`;
                obj["objectTitle"] = `${objectTitle}`;
                obj["dualityortrinity"] = `${fetchH[i].dualityortrinity}`;
                obj["firstdoor"] = `${fetchH[i].firstdoor}`;
                data.push(obj)
            }
            return res.json(data);
        }
    }

    async fetchAllHouse(req, res, next){
        const fetchH = await model.house.find().sort({ _id: -1});
        let data = []
        for (let i = 0; i < fetchH.length; i++ ){
            let idDistrict = fetchH[i].districtId;
            let idObject = fetchH[i].objectId;
            const findTitleDistrict = await model.district.findById(idDistrict);
            const findObject = await model.object.findById(idObject);

            let districtTitle = ''
            if (!findTitleDistrict || findTitleDistrict == undefined || findTitleDistrict == null || findTitleDistrict == ''){
                districtTitle = ''
            }else{
                districtTitle = findTitleDistrict.title
            }

            let objectTitle = ''
            if (!findObject || findObject == undefined || findObject == null || findObject == ''){
                objectTitle = ''
            }else{
                objectTitle = findObject.title
            }


            let obj = JSON.stringify(fetchH[i])
            obj = JSON.parse(obj)
            obj["districtTitle"] = `${districtTitle}`;
            obj["objectTitle"] = `${objectTitle}`;
            obj["dualityortrinity"] = `${fetchH[i].dualityortrinity}`;
            obj["firstdoor"] = `${fetchH[i].firstdoor}`;
            data.push(obj)
        }
        return res.json(data);
    }

    async getHouse(req, res, next){
        const {id} = req.params;
        const getH = await model.house.findById(id);
        return res.json(getH)
    }

    async updateHouse(req, res, next){
        const {id, title, districtId, objectId, entranceCount, floorCount, latitude, longitude, firstdoor, dualityortrinity, whoAdd} = req.body

        if (!title) {
            return next(ApiError.badRequest('Nom yozilmadi'));
        } else if (!districtId) {
            return next(ApiError.badRequest('Tuman tanlanmadi'));
        } else if (!objectId) {
            return next(ApiError.badRequest('Obyekt tanlanmadi'));
        } else if (!entranceCount){
            return next(ApiError.badRequest("Kirish yozilmadi"));
        } else if (!floorCount){
            return next(ApiError.badRequest("Qavat yozilmadi"));
        } else if (!latitude){
            return next(ApiError.badRequest("Kenglik yozilmadi"));
        } else if (!longitude){
            return next(ApiError.badRequest("Uzunligi yozilmadi"));
        } else if (!firstdoor){
            return next(ApiError.badRequest("1-eshik yozilmadi"));
        } else if (!dualityortrinity){
            return next(ApiError.badRequest("nechtaligi yozilmadi"));
        }


        const titlefind = await model.house.findOne({title, districtId, objectId, entranceCount, floorCount, latitude, longitude, firstdoor, dualityortrinity});
        if (titlefind) {
            return next(ApiError.badRequest('Bunaqa nomli Uy mavjud'));
        } else {
            const updateH = await model.house.findByIdAndUpdate(id, {title, districtId, objectId, entranceCount, floorCount, latitude, longitude, firstdoor, dualityortrinity, whoAdd},{new:true});
            return res.json(updateH);
        }
    }

    async deleteHouse(req, res, next){
        const {id} = req.body;
        const FindA = await model.apartment.find({houseId:id});
        if (FindA.length == 0) {
            const deleteH = await model.house.findByIdAndDelete(id);
            return res.json(deleteH);
        }else if (!FindA || FindA.length != 0 || FindA != null || FindA != undefined){
            for (let i = 0; i < FindA.length; i++) {
                let ids = FindA[i]._id.valueOf();
                const deleteA = await model.apartment.findByIdAndDelete(ids);
                if (i == (FindA.length-1)) {
                    const deleteH = await model.house.findByIdAndDelete(id);
                    return res.json(deleteH);                    
                }
            }
        }
    }
}

module.exports = new houseController();