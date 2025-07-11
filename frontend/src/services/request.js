import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tworczasiec.pl/api',
});


request.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    return req;
});

export default request;