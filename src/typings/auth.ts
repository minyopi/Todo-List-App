import { commonResponse } from './';
export interface authProps {
  email: string;
  password: string;
}

export interface postLoginResponse extends commonResponse {
  data: { message: string; token: string };
}

export interface postSignUpResponse extends commonResponse {
  data: { message: string; token: string };
}
