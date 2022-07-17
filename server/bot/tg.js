require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const helper      = require('./helper')
const model       = require('../module/module');

const TOKEN = process.env.BOT_TOKEN

let slat
let slon

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        },
    }
});

helper.logStarted()

const ACTION_TYPE = {
    COME_ADDRESS: 'ca',
    END_CALL: 'ea',
    SET_DISEASE: 'sd',
    DISEASE_INFO: 'di'
}

bot.on('callback_query', query => {
    const userId = query.from.id
    let data
    try {
        data = JSON.parse(query.data)
    } catch(e){
        throw new Error('Data is not an object')
    } 
    
    const { type, selectCallId } = data
    const messageId  = query.message.message_id
    const chatId = query.message.chat.id
    if (type === ACTION_TYPE.COME_ADDRESS) {
        EndAddressCome(selectCallId, userId, messageId, chatId, query.id, data)
    }
    if (type === ACTION_TYPE.END_CALL) {
        EndCallText(query.id)
    }
    if (type === ACTION_TYPE.SET_DISEASE) {
        SetDiseaseInfo(selectCallId, userId, messageId, chatId, query.id, data)
    }
    if (type === ACTION_TYPE.DISEASE_INFO) {
        async function dawqwr(chatId) {
            const fetchDriver         = await model.driver.findOne({chatId:chatId});
            if (fetchDriver) {
                let idD = fetchDriver._id.valueOf()
                const fetchCall         = await model.call.findOne({send: 1, driverId: idD});
                if (fetchCall){
                    let ids = fetchCall._id.valueOf();
                    EndSetText(ids, userId, messageId, chatId, query.id, data)
                }
            }
        }
        dawqwr(chatId)
    }
})
bot.onText(/workingbotnow/, (msg) => {
    bot.sendMessage(helper.getChatId(msg), 'of cource');
});

bot.on('message', msg=>{
    const chatId = msg.chat.id;
    msgworking(chatId,msg);
})

bot.on('edited_message', (msg) => {
    setLocationLiveTraking(msg);
});

async function setLocationLiveTraking(msg) {
    const driver  = await model.driver.findOne({chatId: msg.chat.id});
    let latitude  = msg.location.latitude;
    let longitude = msg.location.longitude;
    const find = await model.traking.findOne({chatId: msg.chat.id});
    if (find) {
        const update = await model.traking.findOneAndUpdate({chatId: msg.chat.id}, { $set: {latitude:latitude, longitude:longitude}});
        return
    } else {
        const create = await model.traking.create({title:driver.title,chatId:msg.chat.id, latitude, longitude});
        return
    }
}

module.exports.SLLT = setLocationLiveTraking;

async function msgworking(chatId,msg) {
    if (msg.text == '/start'){
        bot.sendMessage(chatId, `Iltimos ro'yhat o'tish uchun, pastagi tugmani bosing 👇🏻`,{
            reply_markup: {
                resize_keyboard: true,
                remove_keyboard: true,
                keyboard:[
                    [{text: "Telefon raqamni yuborish 📱", request_contact: true}]
                ],
            }
        });
    }
    if(msg.contact){
        registrationuser(chatId, msg);
    }
    if(msg.location){
        GetAddress(chatId, msg);
    }
}

async function registrationuser(chatId, msg){
    let text = msg.contact.phone_number
    const specialChars = `/[+]+/;`

    const isSpecialCharsPresent = specialChars.split('').some(char => 
    text.includes(char))
    
    let plusnumber 
    if (isSpecialCharsPresent) {
        plusnumber = msg.contact.phone_number
    } else {
        plusnumber = '+' + msg.contact.phone_number
    }
    const id = chatId;
    const condidate = await model.driver.findOne({phone: plusnumber});
    if (condidate) {
        if (condidate.status !== true) {
            const update = await model.driver.findOneAndUpdate({phone: plusnumber}, { $set: {status: true, chatId:chatId}});
            if (update) {
                        bot.sendMessage(chatId, `Rahmat siz tizimga kirdingiz 🙂\n Tez orada sizga xabarlar keladi, iltimos kutib turing 🕔`,{
                            reply_markup: {
                                remove_keyboard: true,
                                force_reply: true,
                            }
                        });
            }
        }else{
            bot.sendMessage(chatId, `Siz oldin tizimdan ro'yhatga o'tgansiz  🤷🏻‍♂️`,{
                reply_markup: {
                    remove_keyboard: true,
                    force_reply: true,
                }
            });
        }
    } else {
        bot.sendMessage(chatId, `Siz tizimda yo'qsiz!!! 🙅🏻‍♂️`,{
            reply_markup: {
                remove_keyboard: true,
                force_reply: true,
            }
        });
    }
}

async function SendMessageToDriver(chatId, callId){
    const fetchDriver = await model.driver.findOne({chatId});
    if (fetchDriver) {
        let id = fetchDriver._id.valueOf()
        fetchDriverCall = await model.call.find({driverId:id});
        if (fetchDriverCall.length > 1){
            fetchDriverCallS = await model.call.find({send:1});
            if (fetchDriverCallS.length > 0) {
                bot.sendMessage(chatId, `Sizga yangi chaqiriq keldi. Manzilni yuborish uchun pastdagi tugmani bosing  👇🏻`,{
                    reply_markup: {
                        resize_keyboard: true,
                        remove_keyboard: true,
                        force_reply: true,
                        keyboard:[
                            [{text: "Manzil yuborish 📍", request_location: true}]
                        ],
                    }
                });
            }  else {
                bot.sendMessage(chatId, `Sizga yangi chaqiriq keldi. Manzilni yuborish uchun pastdagi tugmani bosing  👇🏻`,{
                    reply_markup: {
                        resize_keyboard: true,
                        remove_keyboard: true,
                        force_reply: true,
                        keyboard:[
                            [{text: "Manzil yuborish 📍", request_location: true}]
                        ],
                    }
                });
            }
        } else if(fetchDriverCall.length == 1) {
            bot.sendMessage(chatId, `Sizga yangi chaqiriq keldi. Manzilni yuborish uchun pastdagi tugmani bosing  👇🏻`,{
                reply_markup: {
                    resize_keyboard: true,
                    remove_keyboard: true,
                    force_reply: true,
                    keyboard:[
                        [{text: "Manzil yuborish 📍", request_location: true}]
                    ],
                }
            });
        } else {
            bot.sendMessage(chatId, `Sizga yangi chaqiriq keldi. Manzilni yuborish uchun pastdagi tugmani bosing  👇🏻`,{
                reply_markup: {
                    resize_keyboard: true,
                    remove_keyboard: true,
                    force_reply: true,
                    keyboard:[
                        [{text: "Manzil yuborish 📍", request_location: true}]
                    ],
                }
            });
        }
    } else {
    }
}

module.exports.SMTD = SendMessageToDriver;

async function GetAddress(chatId, msg){

    slat = msg.location.latitude
    slon = msg.location.longitude

    const fetchDriver         = await model.driver.findOne({chatId:chatId});
    if (fetchDriver) {
        let idD = fetchDriver._id.valueOf()
        const fetchCall         = await model.call.findOne({send: 1, driverId: idD});
        if (fetchCall) {
            // console.log(`fetchCall: `,fetchCall);
            let ids = fetchCall._id.valueOf();
            if (fetchCall.type == 3) {
                const updateA = await model.call.findByIdAndUpdate(ids, {blatitude:msg.location.latitude, blongitude:msg.location.longitude},{new:true});
                if (updateA){
                    let sendfirstM = bot.sendMessage(chatId, `Bemor manzili 🏢`,{
                        reply_markup: {
                            force_reply: true,
                            resize_keyboard: true,
                            remove_keyboard: true
                        },  
                    })
    
                    if(sendfirstM){
                        
                        let today = new Date();
                        let hours = today.getHours();
                        let minutes = today.getMinutes();
                        let secondes = today.getSeconds();
                    
                        let timeNow = hours+':'+minutes+':'+secondes 
    
                        const updateS = await model.call.findByIdAndUpdate(ids, {blatitude:slat, blongitude: slon, driverstartTime:timeNow, status:1, send: 1},{new:true});
    
                        if (updateS) {
                            bot.sendMessage(chatId, 
                                `
                                Varia holati\n
    
                                <b><a href="https://www.google.com/maps/dir/${msg.location.latitude},${msg.location.longitude}/${updateS.elatitude},${updateS.elongitude}/data=!3m2!1e3!4b1!4m2!4m1!3e0">👉🏻 MANZIL 👈🏻</a></b>\n
                                
                                ︎ ︎ ︎ ︎\n
                                `,{
                                reply_markup: {
                                    force_reply: true,
                                    resize_keyboard: true,
                                    remove_keyboard: true,
                                    inline_keyboard:[
                                        [
                                            {
                                                text: "Manzilga keldim 🚑🚨🏢",
                                                callback_data: JSON.stringify({
                                                    type: ACTION_TYPE.COME_ADDRESS,
                                                    selectCallId:ids
                                                })
                                            }
                                        ]
                                    ]
                                },   
                                parse_mode: 'HTML'
                            });
                        }else {
                            bot.sendMessage(chatId, `Tizimda xatolik,(Yangilashda) Iltimos @File00000000001 murojat qiling`)
                        }
                    }else{
                        bot.sendMessage(chatId, `Tizimda xatolik, Iltimos @File00000000001 murojat qiling`)
                    }
                } else {
                    bot.sendMessage(chatId, `Tizimda xatolik,(Yangilashda) Iltimos @File00000000001 murojat qiling`)
                }
            }else if (fetchCall != null || fetchCall != undefined) {
                const fetchDistrict         = await model.district.findById(fetchCall.districtId);
                const fetchHouse            = await model.house.findById(fetchCall.houseId);
                const fetchApartment        = await model.apartment.findById(fetchCall.apartmentId);
                const fetchEntrance         = await model.entrance.findById(fetchCall.entranceId);
                const fetchFloor            = await model.floor.findById(fetchCall.floorId);
                const fetchSide             = await model.side.findById(fetchCall.sideId);
                if(!fetchCall.peopleId){
                    const updateA = await model.call.findByIdAndUpdate(ids, {blatitude:msg.location.latitude, blongitude:msg.location.longitude},{new:true});
                    if (updateA){
                        let sendfirstM = bot.sendMessage(chatId, `Bemor manzili 🏢`,{
                            reply_markup: {
                                force_reply: true,
                                resize_keyboard: true,
                                remove_keyboard: true
                            },  
                        })
    
                        if(sendfirstM){
                            
                            let today = new Date();
                            let hours = today.getHours();
                            let minutes = today.getMinutes();
                            let secondes = today.getSeconds();
                        
                            let timeNow = hours+':'+minutes+':'+secondes 
    
                            const updateS = await model.call.findByIdAndUpdate(ids, {blatitude:slat, blongitude: slon, driverstartTime:timeNow, status:1, send: 1},{new:true});
    
                            if (updateS) {
                                bot.sendMessage(chatId, 
                                    `
                                    Manzil: ${fetchDistrict.title}\nUy: ${fetchHouse.title}\nKirish: ${fetchEntrance.title}\nQavat: ${fetchFloor.title}\nTaraf: ${fetchSide.title}\nXonodon: ${fetchApartment.title}\nBemor: ---\n
    
                                    <b><a href="https://www.google.com/maps/dir/${msg.location.latitude},${msg.location.longitude}/${updateS.elatitude},${updateS.elongitude}/data=!3m2!1e3!4b1!4m2!4m1!3e0">👉🏻 MANZIL 👈🏻</a></b>\n
                                    
                                    ︎ ︎ ︎ ︎\n
                                    `,{
                                    reply_markup: {
                                        force_reply: true,
                                        resize_keyboard: true,
                                        remove_keyboard: true,
                                        inline_keyboard:[
                                            [
                                                {
                                                    text: "Manzilga keldim 🚑🚨🏢",
                                                    callback_data: JSON.stringify({
                                                        type: ACTION_TYPE.COME_ADDRESS,
                                                        selectCallId:ids
                                                    })
                                                }
                                            ]
                                        ]
                                    },   
                                    parse_mode: 'HTML'
                                });
                            }else {
                                bot.sendMessage(chatId, `Tizimda xatolik,(Yangilashda) Iltimos @File00000000001 murojat qiling`)
                            }
                        }else{
                            bot.sendMessage(chatId, `Tizimda xatolik, Iltimos @File00000000001 murojat qiling`)
                        }
                    } else {
                        bot.sendMessage(chatId, `Tizimda xatolik,(Yangilashda) Iltimos @File00000000001 murojat qiling`)
                    }
                } else {
                    const fetchPeople   = await model.people.findById(fetchCall.peopleId)
                    const updateA = await model.call.findByIdAndUpdate(ids, {blatitude:msg.location.latitude, blongitude:msg.location.longitude},{new:true});
    
                    if (updateA){
                        let sendfirstM = bot.sendMessage(chatId, `Bemor manzili 🏢`,{
                            reply_markup: {
                                force_reply: true,
                                resize_keyboard: true,
                                remove_keyboard: true
                            },  
                        })
                        if(sendfirstM){
                            let today = new Date();
                            let hours = today.getHours();
                            let minutes = today.getMinutes();
                            let secondes = today.getSeconds();
                        
                            let timeNow = hours+':'+minutes+':'+secondes 
    
                            const updateS = await model.call.findByIdAndUpdate(ids, {status:1, driverstartTime:timeNow, send: 1},{new:true});
    
                            if (updateS) {
                                bot.sendMessage(chatId, 
                                    `
                                    Manzil: ${fetchDistrict.title}\nUy: ${fetchHouse.title}\nKirish: ${fetchEntrance.title}\nQavat: ${fetchFloor.title}\nTaraf: ${fetchSide.title}\nXonodon: ${fetchApartment.title}\nBemor: ${fetchPeople.fish}\n
    
                                    <b><a href="https://www.google.com/maps/dir/${msg.location.latitude},${msg.location.longitude}/${updateS.elatitude},${updateS.elongitude}/data=!3m2!1e3!4b1!4m2!4m1!3e0">👉🏻 MANZIL 👈🏻</a></b>\n
                                    
                                    ︎ ︎ ︎ ︎\n
                                    `,{
                                    reply_markup: {
                                        force_reply: true,
                                        resize_keyboard: true,
                                        remove_keyboard: true,
                                        inline_keyboard:[
                                            [
                                                {
                                                    text: "Manzilga keldim 🚑🚨🏢",
                                                    callback_data: JSON.stringify({
                                                        type: ACTION_TYPE.COME_ADDRESS,
                                                        selectCallId:ids
                                                    })
                                                }
                                            ]
                                        ]
                                    },   
                                    parse_mode: 'HTML'
                                });
                            }else {
                                bot.sendMessage(chatId, `Tizimda xatolik,(Yangilashda) Iltimos @File00000000001 murojat qiling`)
                            }
                        }else{
                            bot.sendMessage(chatId, `Tizimda xatolik, Iltimos @File00000000001 murojat qiling`)
                        }
                    } else {
                        bot.sendMessage(chatId, `Tizimda xatolik,(Yangilashda) Iltimos @File00000000001 murojat qiling`)
                    }
                }
            }
        }else {

        }
    } else {

    }
}

async function EndAddressCome(selectCallId, userId, messageId, chatId, queryId, data){
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let secondes = today.getSeconds();

    let timeNow = hours+':'+minutes+':'+secondes 

    const updateS = await model.call.findByIdAndUpdate(selectCallId, {status:2, driverendTime:timeNow},{new:true});
    if (updateS){
        bot.editMessageReplyMarkup({
            inline_keyboard: [
                [
                    {
                        text: "Yetib kelindi ✅",
                        callback_data: JSON.stringify({
                            type: ACTION_TYPE.END_CALL,
                        })
                    }
                ]
            ]
            }, {
                chat_id: chatId, 
                message_id: messageId
            });
            SendSetDisease(selectCallId, chatId)
    }else {
        bot.answerCallbackQuery({callback_query_id: queryId, text: `Ma'lumot eskirdi Xatolik yuz berdi ❌`});
    }

}

async function SendSetDisease(selectCallId, chatId){
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let secondes = today.getSeconds();

    let timeNow = hours+':'+minutes+':'+secondes 

    const updateC = await model.call.findByIdAndUpdate(selectCallId, {status:2, doctorstartTime:timeNow},{new:true});
    if (updateC) {
        const getDisease = await model.disease.find();
        if (getDisease) {
            let diseaseArray = []
            for (let i = 0; i < getDisease.length; i++) {
                diseaseArray.push({
                    text: getDisease[i].title,
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.SET_DISEASE,
                        selectDiasesa: getDisease[i].title
                    })            
                })
            }
            bot.sendMessage(chatId, 
                `
                Iltimos Kasallikni Tanlang 🤕\n
                `,{
                reply_markup: {
                    force_reply: true,
                    resize_keyboard: true,
                    remove_keyboard: true,
                    inline_keyboard:[
                        diseaseArray
                    ]
                },   
                parse_mode: 'HTML'
            });
        }else {
            bot.answerCallbackQuery({callback_query_id: queryId, text: `Kassaliklar chiqarishda Xatolikka yuz berdi ❌`});
        }
    } else {
        bot.answerCallbackQuery({callback_query_id: queryId, text: `Yangilashda Xatolikka yuz berdi ❌`});
    }

}

async function SetDiseaseInfo(selectCallId, userId, messageId, chatId, queryId, data){
    // console.log(selectCallId, userId, messageId, chatId, queryId, data)
    const getDisease = await model.disease.findOne({title:data.selectDiasesa});
    if (getDisease) {
        let id = getDisease._id.valueOf()
        const getDiseaseInfo = await model.diseaseinfo.find({diseaseId:id});
        let diseaseInfoArray = []
        console.log(getDiseaseInfo.length)

        for (let i = 0; i < getDiseaseInfo.length; i+=2) {
            if (i != 0){
                // console.log(i)
                for (let q = i-2; q < i; q++) {
                    if (q!= 0){
                    // diseaseInfoArray.push(keyboard[q/2] = [{'text': keyboard[q]}, {'text': keyboard[q+1]}]);
                    // console.log('q:'+ q)
                    let dT = data.selectDiasesa
                    let diT = getDiseaseInfo[q].title
                    let diTwo = getDiseaseInfo[q-1].title
                    let datainfo = {sd:dT, sdI:diT}
                    let datainfotwo = {sd:dT, sdI:diTwo}
                    diseaseInfoArray.push([{
                        text: getDiseaseInfo[q].title,
                        callback_data: JSON.stringify({
                            type: ACTION_TYPE.DISEASE_INFO,
                            info: datainfo
                        })            
                    },{
                        text: getDiseaseInfo[q-1].title,
                        callback_data: JSON.stringify({
                            type: ACTION_TYPE.DISEASE_INFO,
                            info: datainfotwo
                        })            
                    }
                ])
                }
            }
        }
            // let dT = data.selectDiasesa
            // let diT = getDiseaseInfo[i].title
            // let datainfo = {sd:dT, sdI:diT}

            // diseaseInfoArray.push({
            //     text: getDiseaseInfo[i].title,
            //     callback_data: JSON.stringify({
            //         type: ACTION_TYPE.DISEASE_INFO,
            //         info: datainfo
            //     })            
            // })
        }
        console.log(diseaseInfoArray.length)
        bot.editMessageText(
            `
            Kassalik: ${data.selectDiasesa}\nIltimos Tashxisni aniqroq tanglang 👇🏻\n
            `,{
            chat_id:chatId,
            message_id: messageId,
            reply_markup: {
                force_reply: true,
                resize_keyboard: true,
                remove_keyboard: true,
                inline_keyboard:diseaseInfoArray
            },   
            parse_mode: 'HTML'
        });
    } else {
        bot.answerCallbackQuery({callback_query_id: queryId, text: `Tashxilar chiqarishda Xatolikka yuz berdi ❌`});
    }
}

async function EndCallText(queryId){
    bot.answerCallbackQuery({callback_query_id: queryId, text: `Bajarildi ✅ Ishingiz uchu kattakon rahmat☺️`});
}

async function EndSetText(selectCallId, userId, messageId, chatId, queryId, data){
    const getDisease = await model.disease.findOne({title:data.info.sd});
    if (getDisease) {
        const getDiseaseInfo = await model.diseaseinfo.findOne({title:data.info.sdI});
        if (getDiseaseInfo) {
            let today = new Date();
            let hours = today.getHours();
            let minutes = today.getMinutes();
            let secondes = today.getSeconds();
        
            let timeNow = hours+':'+minutes+':'+secondes 
        
            const updateC = await model.call.findByIdAndUpdate(selectCallId, {diseaseId: getDisease._id.valueOf(), diseaseInfoId: getDiseaseInfo._id.valueOf(), doctorendTime:timeNow, status: 3},{new:true});
            if (updateC){
                const getCall = await model.call.findById(selectCallId);
                const AddToHistoryCall = await model.callhistory.create({
                    districtId: getCall.districtId,
                    houseId: getCall.houseId,
                    apartmentId: getCall.apartmentId,
                    entranceId: getCall.entranceId,
                    floorId: getCall.floorId,
                    sideId: getCall.sideId,
                    peopleId: getCall.peopleId,
                    operatorId: getCall.operatorId,
                    driverId: getCall.driverId,
                    elatitude: getCall.elatitude,
                    elongitude: getCall.elongitude,
                    calldate: getCall.calldate,
                    callTime: getCall.callTime,
                    blatitude: getCall.blatitude,
                    blongitude: getCall.blongitude,
                    doctorId: getCall.doctorId,
                    driverstartTime: getCall.driverstartTime,
                    driverendTime: getCall.driverendTime,
                    doctorstartTime: getCall.doctorstartTime,
                    diseaseId: getCall.diseaseId,
                    diseaseInfoId: getCall.diseaseInfoId,
                    doctorendTime: getCall.doctorendTime,
                    queue: getCall.queue,
                    status: getCall.status
                });
                if (AddToHistoryCall){
                    const deleteCall = await model.call.findByIdAndDelete(selectCallId);
                    let driverID = deleteCall.driverId
                    if (deleteCall) {
                        bot.answerCallbackQuery({callback_query_id: queryId, text: `Bajarildi ✅ Ishingiz uchu kattakon rahmat☺️`});
                        bot.editMessageText(
                            `
                            Kassalik: ${data.info.sd}\nTashxis: ${data.info.sdI}\nIltimos telefon quvvatini 🔋 va telfon puli 📱 borligini tekshirish esdan chiqmasin ☺️\n
                            `,{
                            chat_id:chatId,
                            message_id: messageId,
                            parse_mode: 'HTML'
                        });
                        fetchDriver = await model.driver.findById(driverID);
                        let diD = fetchDriver.chatId;
                        if (fetchDriver) {
                            fetchDriverCall = await model.call.find({driverId:driverID});
                            if (fetchDriverCall.length != 0) {
                                if (fetchDriverCall.length > 1){
                                    const updateS = await model.call.findByIdAndUpdate(fetchDriverCall[0]._id.valueOf(), {send: 1},{new:true});
                                    if (updateS) {
                                        SendMessageToDriver(diD, fetchDriverCall[0]._id.valueOf())
                                    } else {

                                    }
                                } else if(fetchDriverCall.length > 0) {
                                    const updateS = await model.call.findByIdAndUpdate(fetchDriverCall[0]._id.valueOf(), {send: 1},{new:true});
                                    if (updateS) {
                                        SendMessageToDriver(diD, fetchDriverCall[0]._id.valueOf())
                                    } else {

                                    }
                                }
                            } else {
                                selectCallId = '';
                            }
                        } else {

                        }
                    } else {
                        bot.answerCallbackQuery({callback_query_id: queryId, text: `O'chirishda Xatolikka yuz berdi ❌`});
                    }
                } else {
                    bot.answerCallbackQuery({callback_query_id: queryId, text: `Tarixga kirgizishda Xatolikka yuz berdi ❌`});
                }
            } else {
                bot.answerCallbackQuery({callback_query_id: queryId, text: `Yangilashda Xatolikka yuz berdi ❌`});
            }
        } else {
            bot.answerCallbackQuery({callback_query_id: queryId, text: `Tashxis Xatolikka yuz berdi ❌`});
        }
    } else {
        bot.answerCallbackQuery({callback_query_id: queryId, text: `Kasslik Xatolikka yuz berdi ❌`});
    }
}
module.exports.bot = bot;