export const parseMultipleCategories = str => str.split(',').map(str => ({ name: str.trim() }));
