
export const getToken = () => {
    return localStorage.getItem(process.env.AUTH_TOKEN);
};

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(process.env.AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    localStorage.removeItem(process.env.AUTH_TOKEN);
};