import request from './request';

export const addProduct = async (body) => {
    try {
        const response = await request.post(`/products`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editProduct = async (body, product_id) => {
    try {
        const response = await request.put(`/products/${product_id}`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const toggleVisibility = async (product_id) => {
    try {
        const response = await request.patch(`/products/visible/${product_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getVisibleProducts = async (page, type) => {
    try {
        const response = await request.get(`/products?page=${page}&type=${type}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const uploadZipToServer = async (body) => {
    try {
        const response = await request.post(`/products/upload-zip`, body, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getZipProductsFromServer = async (page, search) => {
    try {
        const response = await request.get(`products/zips/list?page=${page}&search=${search}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getAllProducts = async (page, search) => {
    try {
        const response = await request.get(`/products/visible?page=${page}&search=${search}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const showProduct = async (productCode) => {
    try {
        const response = await request.get(`/products/${productCode}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteProduct = async (product_id) => {
    try {
        const response = await request.delete(`/products/${product_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};