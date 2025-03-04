import { Category, WordlistEntry } from '../__generated__/graphql';

export const parseUniqueCategories = (entries: WordlistEntry[]): Category[] | null => {
  if (!entries) return null;

  const categories = entries.map(entry => entry.categories.map(cat => cat)).flat();

  return categories
    .reduce((acc: Category[], category) => {
      if (!acc.some(({ id }) => id === category.id)) {
        acc.push(category);
      }
      return acc;
    }, [])
    .sort((a, b) => (a.name > b.name ? 1 : -1));
};
