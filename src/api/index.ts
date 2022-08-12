import axios from 'axios';

const _setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
};

export const setAxiosConfig = (token: string | null) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  _setAuthToken(token);
};
