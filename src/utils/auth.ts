export const isEmailValid = (email: string) => {
  return email.includes('@') && email.includes('.');
};

export const isPasswordValid = (password: string) => {
  return password.length >= 8;
};
