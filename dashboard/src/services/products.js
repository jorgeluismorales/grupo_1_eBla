import http from './base';

export const getAllProducts = async () => {
    const { data } = await http.get('/products')
    return data;
};

export const getProductById = async (id) => http.get(`/products/${id}`);

export const deleteProductById = async (id) => http.delete(`/products/${id}`);

export const createProduct = async (formData) => http.post('/products', formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const updateProduct = async (id, formData) => http.patch(`/products/${id}`, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});