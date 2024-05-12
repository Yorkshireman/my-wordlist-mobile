import { categoriesSelectedVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';

export const useFilters = data => {
  const categoriesSelected = useReactiveVar(categoriesSelectedVar);

  if (!categoriesSelected.length) return data;

  const filteredEntries = data.myWordlist.entries.filter(({ categories }) => {
    const wordlistCategoriesIds = categories.map(({ id }) => id);
    return categoriesSelected.every(id => wordlistCategoriesIds.includes(id));
  });

  return {
    ...data,
    myWordlist: {
      ...data.myWordlist,
      entries: filteredEntries
    }
  };
};
