import request from './request';

//SUBSKRYBENCI

export const addToNewsletter = async (body) => {
    try {
        const response = await request.post(`/newsletter/subscribe`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const confirmNewsletter = async (token) => {
    try {
        const response = await request.get(`/newsletter/confirm/${token}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSubscribers = async () => {
    try {
        const response = await request.get(`/newsletter`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteSubscriber = async (id) => {
    try {
        const response = await request.delete(`/newsletter/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//NEWSLETTER

export const getNewsletterCampaigns = async () => {
    try {
        const response = await request.get(`/newsletter/campaigns`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addNewsletterCampaign = async (body) => {
    try {
        const response = await request.post(`/newsletter/campaigns`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const sendOneTimeEmail = async (body) => {
    try {
        const response = await request.post(`/newsletter/send`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
