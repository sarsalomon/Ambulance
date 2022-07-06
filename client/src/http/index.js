import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_RESERVE
});

const $authost = axios.create({
    baseURL: process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_RESERVE
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}

$authost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authost
}