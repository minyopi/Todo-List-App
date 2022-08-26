import axios from 'axios';

const useSetAxiosConfig = (token: string | null) => {
  const setAxiosHeaders = (token: string | null) => {
    if (!token) {
      return;
    }

    axios.defaults.headers.common['Authorization'] = token;
  };

  const setAxiosConfig = (token: string | null) => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    setAxiosHeaders(token);
  };

  setAxiosConfig(token);
};

export default useSetAxiosConfig;
