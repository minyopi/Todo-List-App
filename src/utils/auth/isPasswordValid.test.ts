import isPasswordValid from './isPasswordValid';

describe('auth > isEmailValid()', () => {
  it('when password length is longer than 8', () => {
    expect(isPasswordValid('testtest')).toBe(true);
  });

  it('when password length is shorter than 8', () => {
    expect(isPasswordValid('test')).toBe(false);
  });
});
