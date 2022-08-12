import { CommonResponse } from './';

export interface authProps {
  email: string;
  password: string;
}

export interface postLoginResponse extends CommonResponse {
  data: { message: string; token: string };
}

export interface postSignUpResponse extends CommonResponse {
  data: { message: string; token: string };
}
