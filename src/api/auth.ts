import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

interface AuthParams {
  email: string;
  password: string;
}

export const postLogin = (authInfo: AuthParams) => {
  return axios.post('/users/login', authInfo);
};

export const postSignUp = (authInfo: AuthParams) => {
  return axios.post('/users/create', authInfo);
};
