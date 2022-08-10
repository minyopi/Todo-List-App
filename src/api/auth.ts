import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

interface AuthProps {
  email: string;
  password: string;
}

export const postLogin = (authInfo: AuthProps) => {
  const res = axios.post('/users/login', authInfo);
  return res;
};

export const postSignUp = (authInfo: AuthProps) => {
  const res = axios.post('/users/create', authInfo);
  return res;
};
