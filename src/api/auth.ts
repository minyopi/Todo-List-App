import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8080';

interface AuthProps {
  email: string;
  password: string;
}

export const login = async (authInfo: AuthProps) => {
  const res = await axios.post('/user/login', authInfo);
  if (res.status === 200) {
    Cookies.set('token', res.data.token);
    return '회원가입에 성공했습니다';
  }
  if (res.status === 409) {
    return '이미 존재하는 유저 입니다';
  }

  return '잘못된 요청입니다.';
};

export const signUp = (authInfo: AuthProps) => {
  const res = axios.post('/users/create', authInfo);
  return res;
};
