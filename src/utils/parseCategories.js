export const parseCategories = str => {
  if (!str) throw new Error('str param cannot be falsey');
  return str.split(',').map(str => ({ name: str.trim().toLowerCase() }));
};
