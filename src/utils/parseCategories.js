export const parseCategories = str => str.split(',').map(str => ({ name: str.trim() }));
