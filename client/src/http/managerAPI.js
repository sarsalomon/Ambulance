import { $authost } from "./index";

// FETCH

export const fetchApartment = async (districtId, houseId, objectId) => {
    const {data} = await $authost.post('api/apartment/byid', {districtId, houseId, objectId});
    return data
}

export const fetchAllApartment = async () => {
    const {data} = await $authost.post('api/apartment/');
    return data
}

export const fetchCar = async () => {
    const {data} = await $authost.post('api/car/byid');
    return data
}

export const fetchAllCar = async () => {
    const {data} = await $authost.post('api/car/');
    return data
}

export const fetchDisease = async () => {
    const {data} = await $authost.post('api/disease/byid');
    return data
}

export const fetchAllDisease = async () => {
    const {data} = await $authost.post('api/disease/');
    return data
}

export const fetchDiseaseInfo = async (diseaseId) => {
    const {data} = await $authost.post('api/disease/infobyid', {diseaseId});
    return data
}

export const fetchAllDiseaseInfo = async () => {
    const {data} = await $authost.post('api/disease/info');
    return data
}

export const fetchDistrict = async () => {
    const {data} = await $authost.post('api/district/byid');
    return data
}

export const fetchAllDistrict = async () => {
    const {data} = await $authost.post('api/district/');
    return data
}

export const fetchDriver = async () => {
    const {data} = await $authost.post('api/driver/byid');
    return data
}

export const fetchAllDriver = async () => {
    const {data} = await $authost.post('api/driver/');
    return data
}

export const fetchEntrance = async () => {
    const {data} = await $authost.post('api/entrance/byid');
    return data
}

export const fetchAllEntrance = async () => {
    const {data} = await $authost.post('api/entrance/');
    return data
}

export const fetchFloor = async () => {
    const {data} = await $authost.post('api/floor/byid');
    return data
}

export const fetchAllFloor = async () => {
    const {data} = await $authost.post('api/floor/');
    return data
}

export const fetchHouse = async (districtId) => {
    const {data} = await $authost.post('api/house/byid', {districtId});
    return data
}

export const fetchAllHouse = async () => {
    const {data} = await $authost.post('api/house/');
    return data
}

export const fetchNeighborhood = async () => {
    const {data} = await $authost.post('api/neighborhood/byid');
    return data
}

export const fetchAllNeighborhood = async () => {
    const {data} = await $authost.post('api/neighborhood/');
    return data
}

export const fetchObject = async () => {
    const {data} = await $authost.post('api/object/byid');
    return data
}

export const fetchAllObject = async () => {
    const {data} = await $authost.post('api/object/');
    return data
}

export const fetchPeople = async () => {
    const {data} = await $authost.post('api/people/byid');
    return data
}

export const fetchAllPeople = async () => {
    const {data} = await $authost.post('api/people/');
    return data
}

export const fetchSide = async () => {
    const {data} = await $authost.post('api/side/byid');
    return data
}

export const fetchAllSide = async () => {
    const {data} = await $authost.post('api/side/');
    return data
}

export const fetchStatisticHistory = async (districtId, houseId, apartmentId, diseaseId, diseaseInfoId, callDatefrom, callDateto) => {
    const {data} = await $authost.post('api/statistichistory/byid', {districtId, houseId, apartmentId, diseaseId, diseaseInfoId, callDatefrom, callDateto});
    return data
}

export const fetchAllStatisticHistory = async () => {
    const {data} = await $authost.post('api/statistichistory/');
    return data
}

export const fetchStatistic = async () => {
    const {data} = await $authost.post('api/statistic/');
    return data
}

export const fetchTraking = async () => {
    const {data} = await $authost.post('api/driver/traking/');
    return data
}
// ADD

export const addApartment = async (info) => {
    const {data} = await $authost.post('api/apartment/add', info);
    return data
}

export const addCar = async (info) => {
    const {data} = await $authost.post('api/car/add', info);
    return data
}

export const addDisease = async (info) => {
    const {data} = await $authost.post('api/disease/add', info);
    return data
}

export const addDiseaseInfo = async (info) => {
    const {data} = await $authost.post('api/disease/infoadd', info);
    return data
}

export const addDistrict = async (info) => {
    const {data} = await $authost.post('api/district/add', info);
    return data
}

export const addDriver = async (info) => {
    const {data} = await $authost.post('api/driver/add', info);
    return data
}

export const addEntrance = async (info) => {
    const {data} = await $authost.post('api/entrance/add', info);
    return data
}

export const addFloor = async (info) => {
    const {data} = await $authost.post('api/floor/add', info);
    return data
}

export const addHouse = async (info) => {
    const {data} = await $authost.post('api/house/add', info);
    return data
}

export const addNeighborhood = async (info) => {
    const {data} = await $authost.post('api/neighborhood/add', info);
    return data
}

export const addObject = async (info) => {
    const {data} = await $authost.post('api/object/add', info);
    return data
}

export const addPeople = async (info) => {
    const {data} = await $authost.post('api/people/add', info);
    return data
}

export const addSide = async (info) => {
    const {data} = await $authost.post('api/side/add', info);
    return data
}

// GET

export const getApartment = async (id) => {
    const {data} = await $authost.get('api/apartment/get/' + id);
    return data
}

export const getDistrict = async (id) => {
    const {data} = await $authost.get('api/district/get/' + id);
    return data
}

export const getDisease = async (id) => {
    const {data} = await $authost.get('api/disease/get/' + id);
    return data
}

export const getDiseaseInfo = async (id) => {
    const {data} = await $authost.get('api/disease/getinfo/' + id);
    return data
}

export const getDriver = async (id) => {
    const {data} = await $authost.get('api/driver/get/' + id);
    return data
}

export const getCar = async (id) => {
    const {data} = await $authost.get('api/car/get/' + id);
    return data
}

export const getNeighborhood = async (id) => {
    const {data} = await $authost.get('api/neighborhood/get/' + id);
    return data
}

export const getObject = async (id) => {
    const {data} = await $authost.get('api/object/get/' + id);
    return data
}

export const getHouse = async (id) => {
    const {data} = await $authost.get('api/house/get/' + id);
    return data
}

export const getEntrance = async (id) => {
    const {data} = await $authost.get('api/entrance/get/' + id);
    return data
}

export const getFloor = async (id) => {
    const {data} = await $authost.get('api/floor/get/' + id);
    return data
}

export const getSide = async (id) => {
    const {data} = await $authost.get('api/side/get/' + id);
    return data
}

export const getPeople = async (id) => {
    const {data} = await $authost.get('api/people/get/' + id);
    return data
}


// UPDATE

export const updateApartment = async (info) => {
    const {data} = await $authost.post('api/apartment/update', info);
    return data
}

export const updateEntrance = async (info) => {
    const {data} = await $authost.post('api/entrance/update', info);
    return data
}

export const updateDistrict = async (info) => {
    const {data} = await $authost.post('api/district/update', info);
    return data
}

export const updateDisease = async (info) => {
    const {data} = await $authost.post('api/disease/update', info);
    return data
}

export const updateDiseaseInfo = async (info) => {
    const {data} = await $authost.post('api/disease/updateinfo', info);
    return data
}

export const updateDriver = async (info) => {
    const {data} = await $authost.post('api/driver/update', info);
    return data
}

export const updateCar = async (info) => {
    const {data} = await $authost.post('api/car/update', info);
    return data
}

export const updateNeighborhood = async (info) => {
    const {data} = await $authost.post('api/neighborhood/update', info);
    return data
}

export const updateHouse = async (info) => {
    const {data} = await $authost.post('api/house/update', info);
    return data
}

export const updateObject = async (info) => {
    const {data} = await $authost.post('api/object/update', info);
    return data
}

export const updateFloor = async (info) => {
    const {data} = await $authost.post('api/floor/update', info);
    return data
}

export const updateSide = async (info) => {
    const {data} = await $authost.post('api/side/update', info);
    return data
}

export const updateShift = async (info) => {
    const {data} = await $authost.post('api/side/update', info);
    return data
}

export const updatePeople = async (info) => {
    const {data} = await $authost.post('api/people/update', info);
    return data
}

// DELETE

export const deleteApartment = async (id) => {
    const {data} = await $authost.post('api/apartment/delete', {id});
    return data
}

export const deleteCar = async (id) => {
    const {data} = await $authost.post('api/car/delete', {id});
    return data
}

export const deleteDisease = async (id) => {
    const {data} = await $authost.post('api/disease/delete', {id});
    return data
}

export const deleteDiseaseInfo = async (id) => {
    const {data} = await $authost.post('api/disease/delete', {id});
    return data
}

export const deleteDistrict = async (id) => {
    const {data} = await $authost.post('api/district/delete', {id});
    return data
}

export const deleteDriver = async (id) => {
    const {data} = await $authost.post('api/driver/delete', {id});
    return data
}

export const deleteEntrance = async (id) => {
    const {data} = await $authost.post('api/entrance/delete', {id});
    return data
}

export const deleteFloor = async (id) => {
    const {data} = await $authost.post('api/floor/delete', {id});
    return data
}

export const deleteHouse = async (id) => {
    const {data} = await $authost.post('api/house/delete', {id});
    return data
}

export const deleteObject = async (id) => {
    const {data} = await $authost.post('api/object/delete', {id});
    return data
}

export const deletePeople = async (id) => {
    const {data} = await $authost.post('api/people/delete', {id});
    return data
}

export const deleteSide = async (id) => {
    const {data} = await $authost.post('api/side/delete', {id});
    return data
}

export const deleteCall = async (id) => {
    const {data} = await $authost.post('api/call/delete', {id});
    return data
}