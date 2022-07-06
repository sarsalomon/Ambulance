import { $authost } from "./index";

// FETCH

export const AdminfetchApartment = async () => {
    const {data} = await $authost.post('api/apartment/');
    return data
}

export const AdminfetchCar = async () => {
    const {data} = await $authost.post('api/car/');
    return data
}

export const AdminfetchDisease = async () => {
    const {data} = await $authost.post('api/disease/');
    return data
}

export const AdminfetchDistrict = async () => {
    const {data} = await $authost.post('api/district/');
    return data
}

export const AdminfetchDriver = async () => {
    const {data} = await $authost.post('api/driver/');
    return data
}

export const AdminfetchEntrance = async () => {
    const {data} = await $authost.post('api/entrance/');
    return data
}

export const AdminfetchFloor = async () => {
    const {data} = await $authost.post('api/floor/');
    return data
}

export const AdminfetchHouse = async () => {
    const {data} = await $authost.post('api/house/');
    return data
}

export const AdminfetchNeighborhood = async () => {
    const {data} = await $authost.post('api/neighborhood/');
    return data
}

export const AdminfetchObject = async () => {
    const {data} = await $authost.post('api/object/');
    return data
}

export const AdminfetchPeople = async () => {
    const {data} = await $authost.post('api/people/');
    return data
}

export const AdminfetchSide = async () => {
    const {data} = await $authost.post('api/side/');
    return data
}

export const AdminfetchUser = async () => {
    const {data} = await $authost.post('api/user/');
    return data
}
// ADD

export const AdminaddDistrict = async (title) => {
    const {data} = await $authost.post('api/district/add', {title});
    return data
}

export const AdminaddDisease = async (title) => {
    const {data} = await $authost.post('api/disease/add', {title});
    return data
}

export const AdminaddNeighborhood = async (title) => {
    const {data} = await $authost.post('api/neighborhood/add', {title});
    return data
}

export const AdminaddHouse = async (title) => {
    const {data} = await $authost.post('api/house/add', {title});
    return data
}

export const AdminaddObject = async (title) => {
    const {data} = await $authost.post('api/object/add', {title});
    return data
}

export const AdminaddEntrance = async (title) => {
    const {data} = await $authost.post('api/entrance/add', {title});
    return data
}

export const AdminaddFloor = async (title) => {
    const {data} = await $authost.post('api/floor/add', {title});
    return data
}

export const AdminaddSide = async (title) => {
    const {data} = await $authost.post('api/side/add', {title});
    return data
}

export const AdminaddApartment = async (apartment) => {
    const {data} = await $authost.post('api/apartment/add', apartment);
    return data
}

export const AdminaddPeople = async (people) => {
    const {data} = await $authost.post('api/people/add', people);
    return data
}

// GET


export const AdmingetDistrict = async (id) => {
    const {data} = await $authost.get('api/district/get/' + id);
    return data
}

export const AdmingetNeighborhood = async (id) => {
    const {data} = await $authost.get('api/neighborhood/get/' + id);
    return data
}

export const AdmingetObject = async (id) => {
    const {data} = await $authost.get('api/object/get/' + id);
    return data
}

export const AdmingetHouse = async (id) => {
    const {data} = await $authost.get('api/house/get/' + id);
    return data
}

export const AdmingetEntrance = async (id) => {
    const {data} = await $authost.get('api/entrance/get/' + id);
    return data
}

export const AdmingetFloor = async (id) => {
    const {data} = await $authost.get('api/floor/get/' + id);
    return data
}

export const AdmingetSide = async (id) => {
    const {data} = await $authost.get('api/side/get/' + id);
    return data
}

export const AdmingetPeople = async (id) => {
    const {data} = await $authost.get('api/people/get/' + id);
    return data
}

export const AdmingetApartment = async (id) => {
    const {data} = await $authost.get('api/apartment/get/' + id);
    return data
}


// UPDATE

export const AdminupdateApartment = async (apartment) => {
    const {data} = await $authost.post('api/apartment/update', apartment);
    return data
}

export const AdminupdateEntrance = async () => {
    const {data} = await $authost.post('api/entrance/update');
    return data
}

export const AdminupdateDistrict = async () => {
    const {data} = await $authost.post('api/district/update');
    return data
}

export const AdminupdateNeighborhood = async () => {
    const {data} = await $authost.post('api/neighborhood/update');
    return data
}

export const AdminupdateHouse = async () => {
    const {data} = await $authost.post('api/house/update');
    return data
}

export const AdminupdateObject = async () => {
    const {data} = await $authost.post('api/object/update');
    return data
}

export const AdminupdateFloor = async () => {
    const {data} = await $authost.post('api/floor/update');
    return data
}

export const AdminupdateSide = async () => {
    const {data} = await $authost.post('api/side/update');
    return data
}

export const AdminupdatePeople = async (people) => {
    const {data} = await $authost.post('api/people/update', people);
    return data
}

// DELETE

export const AdmindeleteApartment = async (id) => {
    const {data} = await $authost.post('api/apartment/delete', {id});
    return data
}

export const AdmindeleteCar = async (id) => {
    const {data} = await $authost.post('api/car/delete', {id});
    return data
}

export const AdmindeleteDisease = async (id) => {
    const {data} = await $authost.post('api/disease/delete', {id});
    return data
}

export const AdmindeleteDistrict = async (id) => {
    const {data} = await $authost.post('api/district/delete', {id});
    return data
}

export const AdmindeleteDriver = async (id) => {
    const {data} = await $authost.post('api/driver/delete', {id});
    return data
}

export const AdmindeleteEntrance = async (id) => {
    const {data} = await $authost.post('api/entrance/delete', {id});
    return data
}

export const AdmindeleteFloor = async (id) => {
    const {data} = await $authost.post('api/floor/delete', {id});
    return data
}

export const AdmindeleteHouse = async (id) => {
    const {data} = await $authost.post('api/house/delete', {id});
    return data
}

export const AdmindeleteNeighborhood = async (id) => {
    const {data} = await $authost.post('api/neighborhood/delete', {id});
    return data
}

export const AdmindeleteObject = async (id) => {
    const {data} = await $authost.post('api/object/delete', {id});
    return data
}

export const AdmindeletePeople = async (id) => {
    const {data} = await $authost.post('api/floor/delete', {id});
    return data
}

export const AdmindeleteSide = async (id) => {
    const {data} = await $authost.post('api/side/delete', {id});
    return data
}

export const AdmindeleteUser = async (id) => {
    const {data} = await $authost.post('api/user/delete', {id});
    return data
}