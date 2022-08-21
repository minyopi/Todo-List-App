import isEmailValid from './isEmailValid';

describe('auth > isEmailValid()', () => {
  it('when email param has "@" and "."', () => {
    expect(isEmailValid('test@test.com')).toBe(true);
  });

  it('when email param does not have "@"', () => {
    expect(isEmailValid('test.com')).toBe(false);
  });

  it('when email param does not have "."', () => {
    expect(isEmailValid('test@test')).toBe(false);
  });

  it('when email param does not have "@" and "."', () => {
    expect(isEmailValid('testtestcom')).toBe(false);
  });
});
