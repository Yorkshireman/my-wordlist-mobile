import { sanitiseText } from './sanitiseText';

export const parseCategories = (str: string) => {
  if (!str) throw new Error('str param cannot be falsey');
  return str.split(',').map(str => ({ name: sanitiseText(str) }));
};
