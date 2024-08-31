import { MyWordlist } from '../__generated__/graphql';
import { selectedCategoriesIdsVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';

export const useFilters = (data: { myWordlist: MyWordlist }) => {
  const selectedCategoriesIds = useReactiveVar(selectedCategoriesIdsVar);

  if (!selectedCategoriesIds.length) return data;

  const entries = data.myWordlist.entries || [];

  const filteredEntries = !selectedCategoriesIds
    ? entries
    : entries.filter(({ categories }) => {
        const wordlistCategoriesIds = categories.map(({ id }) => id);
        return selectedCategoriesIds.every(id => wordlistCategoriesIds.includes(id));
      });

  const anyFiltersApplied = Boolean(selectedCategoriesIds.length);

  return {
    anyFiltersApplied,
    ...data,
    myWordlist: {
      ...data.myWordlist,
      entries: filteredEntries
    }
  };
};
