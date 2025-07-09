import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000/api',
});


request.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    return req;
});

export default request;