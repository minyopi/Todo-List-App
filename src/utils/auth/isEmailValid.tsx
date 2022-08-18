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
