export const isEmailValid = (email: string) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  return email.includes('@') && email.includes('.');
};

export const isPasswordValid = (password: string) => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  return password.length >= 8;
};
