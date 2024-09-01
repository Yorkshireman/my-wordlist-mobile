import { WordlistEntry } from '../__generated__/graphql';

export const parseUniqueCategories = (entries: WordlistEntry[]) => {
  if (!entries) return null;

  const categories = entries
    .map(entry => entry.categories.map(({ id, name }) => ({ id, name })))
    .flat();

  return categories
    .reduce((acc: { id: string; name: string }[], category) => {
      if (!acc.some(({ id }) => id === category.id)) {
        acc.push(category);
      }
      return acc;
    }, [])
    .sort((a, b) => (a.name > b.name ? 1 : -1));
};
