import { MyWordlist } from '../__generated__/graphql';
import { selectedCategoriesIdsVar } from '../reactiveVars';
import { UseFiltersReturnType } from '../../types';
import { useReactiveVar } from '@apollo/client';

export const useFilters = (data?: { myWordlist: MyWordlist }): UseFiltersReturnType => {
  const selectedCategoriesIds = useReactiveVar(selectedCategoriesIdsVar);
  const anyFiltersApplied = Boolean(selectedCategoriesIds.length);

  if (!data) return { anyFiltersApplied };
  if (!selectedCategoriesIds.length) return { anyFiltersApplied, ...data };

  const entries = data.myWordlist.entries || [];

  const filteredEntries = !selectedCategoriesIds
    ? entries
    : entries.filter(({ categories }) => {
        const wordlistCategoriesIds = categories.map(({ id }) => id);
        return selectedCategoriesIds.every(id => wordlistCategoriesIds.includes(id));
      });

  return {
    anyFiltersApplied,
    ...data,
    myWordlist: {
      ...data.myWordlist,
      entries: filteredEntries
    }
  };
};
