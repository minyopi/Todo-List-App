import { atom } from 'recoil';

interface AuthState {
  token: string | undefined;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: { token: undefined },
});
