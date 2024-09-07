export const sanitiseText = (str: string) => {
  if (str === undefined) {
    throw new Error('sanitiseText(): str parameter is undefined.');
  }

  if (str === null) {
    throw new Error('sanitiseText(): str parameter is null.');
  }

  return str.trim().toLowerCase();
};
