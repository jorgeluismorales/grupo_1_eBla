export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token && token.length > 10;
};

export const clearToken = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    return { token };
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};
