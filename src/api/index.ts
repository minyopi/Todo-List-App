import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/auth';

const _setAuthToken = () => {
  const { token } = useRecoilValue(authState);

  if (typeof token === 'string') {
    axios.defaults.headers.common['Authorization'] = token;
  }
};

export const setAxiosConfig = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  _setAuthToken();
};
