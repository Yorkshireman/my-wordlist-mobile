import { Category } from '../__generated__/graphql';
import { selectedCategoriesIdsVar } from '../reactiveVars';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

// if wordlist categories have changed in such a way that renders any selected categories redundant,
// remove them from the selectedCategoriesIdsVar
export const useUpdateCategoriesSelectedIdsVar = (wordlistCategories: Category[]) => {
  const selectedCategoriesIds = useReactiveVar(selectedCategoriesIdsVar);

  useEffect(() => {
    const isIncludedCategoryInWordlist = (categoryId: string) => {
      return wordlistCategories.some(({ id }) => id === categoryId);
    };

    const nonOrphanedSelectedCategories = selectedCategoriesIds.filter(
      isIncludedCategoryInWordlist
    );

    if (
      nonOrphanedSelectedCategories.sort().toString() !== selectedCategoriesIds.sort().toString()
    ) {
      selectedCategoriesIdsVar(nonOrphanedSelectedCategories);
    }
  }, [selectedCategoriesIds, wordlistCategories]);
};
