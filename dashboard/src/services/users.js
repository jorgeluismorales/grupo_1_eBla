import http from './base';

export const getAllUsers = async () => {
    const { data } = await http.get('/users')
    return data;
};

export const getUserById = async (id) => http.get(`/users/${id}`);

export const deleteUserById = async (id) => http.delete(`/users/${id}`);

export const createUser = async (formData) => http.post('/users', formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const updateUser = async (id, formData) => http.patch(`/users/${id}`, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
})