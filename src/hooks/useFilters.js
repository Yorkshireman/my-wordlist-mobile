import { selectedCategoriesVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';

export const useFilters = data => {
  const selectedCategories = useReactiveVar(selectedCategoriesVar);

  if (!selectedCategories.length) return data;

  const filteredEntries = data.myWordlist.entries.filter(({ categories }) => {
    const wordlistCategoriesIds = categories.map(({ id }) => id);
    return selectedCategories.every(id => wordlistCategoriesIds.includes(id));
  });

  return {
    ...data,
    myWordlist: {
      ...data.myWordlist,
      entries: filteredEntries
    }
  };
};
