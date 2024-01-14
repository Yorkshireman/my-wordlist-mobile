export const isInvalidEmail = email => {
  if (email.length === 1) return true;

  const regex = new RegExp('@');
  return !regex.test(email);
};
