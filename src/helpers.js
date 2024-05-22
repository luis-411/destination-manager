
export const getToken = () => {
    return localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN);
};

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN);
};