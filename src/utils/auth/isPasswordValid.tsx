/**
 * Check Validation of Password. Length of password must longer than 8.
 * @param password
 */
export const isPasswordValid = (password: string) => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  return password.length >= 8;
};

export default isPasswordValid;
