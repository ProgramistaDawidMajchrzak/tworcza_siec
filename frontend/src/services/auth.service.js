import request from './request';


export const registerClient = async (body) => {
  const response = await request.post('/auth/register-client', body);
  return response.data;
};

export const resendVerification = async (body) => {
  const response = await request.post('/auth/resend-verification', body);
  return response.data;
};



export const login = async (body) => {
    try {
        const response = await request.post('/auth/login', body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const register = async (body) => {
    try {
        const response = await request.post('/auth/register', body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const logout = async () => {
    try {
        const response = await request.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const refresh = async () => {
    try {
        const response = await request.post('/auth/refresh');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};