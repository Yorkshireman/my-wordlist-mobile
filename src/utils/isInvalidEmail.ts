export const isInvalidEmail = (email: string) => {
  if (email.length === 1) return true;

  const regex = new RegExp('@');
  return !regex.test(email);
};
