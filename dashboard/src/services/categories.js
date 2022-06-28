import http from './base';

export const getAllCategories = async () => {
    const { data } = await http.get('/categories')
    return data;
};

export const getCategoryById = async (id) => http.get(`/categories/${id}`);

export const createCategory = async (categoryName) => http.post('/categories', { categoryName });

export const deleteCategory = async (id) => http.delete(`/categories/${id}`);

export const updateCategory = async (id, categoryName) => http.put(`/categories/${id}`, { categoryName });