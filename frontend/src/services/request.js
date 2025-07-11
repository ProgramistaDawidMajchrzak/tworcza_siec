import axios from 'axios';

const request = axios.create({
    baseURL: 'http://128.140.40.152:3001/api',
});


request.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    return req;
});

export default request;