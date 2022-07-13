const {Schema, model} = require('mongoose')

const DistrictSchema = new Schema({
    title:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const NeighborhoodSchema = new Schema({
    title:{type:String},
    districtId:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const ObjectSchema = new Schema({
    title:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const EntranceSchema = new Schema({
    title:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const FloorSchema = new Schema({
    title:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const SideSchema = new Schema({
    title:{type:String},
    idNumber:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const HouseSchema = new Schema({
    districtId:{type:String},
    objectId:{type:String},
    entranceCount:{type:String},
    floorCount:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    firstdoor:{type:String},
    dualityortrinity:{type:String},
    normalornot:{type:String},
    whoAdd:{type:String},
    title:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const ApartmentSchema = new Schema({
    districtId:{type:String},
    objectId:{type:String},
    houseId:{type:String},
    entranceId:{type:String},
    floorId:{type:String},
    sideId:{type:String},
    title:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const PeopleSchema = new Schema({
    districtId:{type:String},
    objectId:{type:String},
    houseId:{type:String},
    entranceId:{type:String},
    floorId:{type:String},
    sideId:{type:String},
    apartmentId:{type:String},
    sex:{type:String},
    birthday:{type:String},
    fish:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const DiseaseSchema = new Schema({
    title:{type:String},
    description:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const DiseaseInfoSchema = new Schema({
    diseaseId:{type:String},
    title:{type:String},
    description:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const UserSchema = new Schema({
    login:{type:String},
    password:{type:String},
    name:{type:String},
    phone:{type:String},
    address:{type:String},
    birthday:{type:String},
    role:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const CarSchema = new Schema({
    title:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const DriverSchema = new Schema({
    title:{type:String},
    phone:{type:String},
    address:{type:String},
    birthday:{type:String},
    chatId:{type:String},
    carId:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const ShiftSchema = new Schema({
    title:{type:String},
    driverId:{type:String},
    nurseId:{type:String},
    shiftDate:{type:String},
    whoAdd:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const CallSchema = new Schema({
    districtId:{type:String},
    objectId:{type:String},
    houseId:{type:String},
    apartmentId:{type:String},
    entranceId:{type:String},
    floorId:{type:String},
    sideId:{type:String},
    peopleId:{type:String},
    operatorId:{type:String},
    driverId:{type:String},
    elatitude:{type:String},
    elongitude:{type:String},
    calldate:{type:String},
    callTime:{type:String},
    blatitude:{type:String},
    blongitude:{type:String},
    doctorId:{type:String},
    driverstartTime:{type:String},
    driverendTime:{type:String},
    doctorstartTime:{type:String},
    diseaseId:{type:String},
    diseaseInfoId:{type:String},
    doctorendTime:{type:String},
    queue:{type:String},
    type:{type:String},
    send:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const CallHistorySchema = new Schema({
    districtId:{type:String},
    objectId:{type:String},
    houseId:{type:String},
    apartmentId:{type:String},
    entranceId:{type:String},
    floorId:{type:String},
    sideId:{type:String},
    peopleId:{type:String},
    operatorId:{type:String},
    driverId:{type:String},
    elatitude:{type:String},
    elongitude:{type:String},
    calldate:{type:String},
    callTime:{type:String},
    blatitude:{type:String},
    blongitude:{type:String},
    doctorId:{type:String},
    driverstartTime:{type:String},
    driverendTime:{type:String},
    doctorstartTime:{type:String},
    diseaseId:{type:String},
    diseaseInfoId:{type:String},
    doctorendTime:{type:String},
    queue:{type:String},
    type:{type:String},
    send:{type:String},
    status:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const TrakingSchema = new Schema({
    title:{type:String},
    chatId:{type:String},
    latitude:{type:String},
    longitude:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

module.exports.district       = model("District", DistrictSchema);
module.exports.neighborhood   = model("Neighborhood", NeighborhoodSchema);
module.exports.object         = model("Object", ObjectSchema);
module.exports.house          = model("House", HouseSchema);
module.exports.entrance       = model("Entrance", EntranceSchema);
module.exports.floor          = model("Floor", FloorSchema);
module.exports.side           = model("Side", SideSchema);
module.exports.apartment      = model("Apartment", ApartmentSchema);
module.exports.people         = model("People", PeopleSchema);
module.exports.disease        = model("Disease", DiseaseSchema)
module.exports.diseaseinfo    = model("DiseaseInfo", DiseaseInfoSchema)
module.exports.user           = model("User", UserSchema);
module.exports.car            = model("Car", CarSchema);
module.exports.driver         = model("Driver", DriverSchema);
module.exports.shift          = model("Shift", ShiftSchema);
module.exports.call           = model("Call", CallSchema);
module.exports.callhistory    = model("CallHistory", CallHistorySchema);
module.exports.traking        = model("Traking", TrakingSchema);