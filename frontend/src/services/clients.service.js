import request from './request';

export const getAllClients = async (page, type) => {
    try {
        const response = await request.get(`/auth/users?page=${page}&search=${type}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};