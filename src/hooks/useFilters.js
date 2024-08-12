import { selectedCategoriesIdsVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';

export const useFilters = data => {
  const selectedCategoriesIds = useReactiveVar(selectedCategoriesIdsVar);

  if (!selectedCategoriesIds.length) return data;

  const filteredEntries = data.myWordlist.entries.filter(({ categories }) => {
    const wordlistCategoriesIds = categories.map(({ id }) => id);
    return selectedCategoriesIds.every(id => wordlistCategoriesIds.includes(id));
  });

  return {
    ...data,
    myWordlist: {
      ...data.myWordlist,
      entries: filteredEntries
    }
  };
};
