import { $authost } from "./index";

// FETCH

export const fetchPeople = async (fish) => {
    const {data} = await $authost.post('api/people/search', {fish});
    return data
}

export const fetchDistrict = async (title) => {
    const {data} = await $authost.post('api/district/search', {title});
    return data
}

export const fetchDriver = async (name) => {
    const {data} = await $authost.post('api/driver/');
    return data
}

export const fetchCall = async () => {
    const {data} = await $authost.post('api/people/search');
    return data
}

// ADD

export const addCall = async (form) => {
    const {data} = await $authost.post('api/call/add/', form);
    return data
}

// GET

export const getTerritory = async (id) => {
    const {data} = await $authost.get('api/territory/get/' + id);
    return data
}

export const getCityOrVillage = async (id) => {
    const {data} = await $authost.get('api/cityorvillage/get/' + id);
    return data
}

export const getDistrict = async (id) => {
    const {data} = await $authost.get('api/district/get/' + id);
    return data
}

export const getNeighborhood = async (id) => {
    const {data} = await $authost.get('api/neighborhood/get/' + id);
    return data
}

export const getStreet = async (id) => {
    const {data} = await $authost.get('api/street/get/' + id);
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

export const getApartment = async (id) => {
    const {data} = await $authost.get('api/apartment/get/' + id);
    return data
}