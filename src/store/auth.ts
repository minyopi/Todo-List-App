import { atom } from 'recoil';

interface authState {
  token: string | undefined;
}

export const authState = atom<authState>({
  key: 'authState',
  default: { token: undefined },
});
