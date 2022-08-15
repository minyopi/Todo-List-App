import { postLoginResponse, postSignUpResponse } from '../typings/auth';
import axios from 'axios';
interface AuthParams {
  email: string;
  password: string;
}

export const postLogin = (authInfo: AuthParams): Promise<postLoginResponse> => {
  return axios.post('/users/login', authInfo);
};

export const postSignUp = (authInfo: AuthParams): Promise<postSignUpResponse> => {
  return axios.post('/users/create', authInfo);
};
