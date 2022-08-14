/**
 * Check Validation of Email. It must include "@" and "."
 * @param email
 */

export const isEmailValid = (email: string) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  return email.includes('@') && email.includes('.');
};

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
