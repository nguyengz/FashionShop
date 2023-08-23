import axios from 'axios';

// const API_URL = 'https://clothes-shopvn.herokuapp.com/api/auth/';
const API_URL ='https://clothesshop.herokuapp.com/api/auth/'

const register = (name, username, email, password, address, roles) => {
    return axios.post(API_URL + 'signup', {
        name,
        username,
        email,
        password,
        address,
        roles,
    });
};

const login = async (username, password) => {
    const response = await axios.post(API_URL + 'signin', {
        username,
        password,
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
