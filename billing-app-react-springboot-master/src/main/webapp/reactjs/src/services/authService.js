import axios from 'axios';

const API_URL = "http://localhost:8081/api/auth/";

const register = (username, password, role) => {
    return axios.post(API_URL + "signup", {
        username,
        password,
        role: [role] // Backend expects a set of roles, e.g. ["admin"]
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) { // Assuming the token is in response.data.token
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;