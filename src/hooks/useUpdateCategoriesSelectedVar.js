import { categoriesSelectedVar } from '../reactiveVars';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

// if wordlist categories have changed in such a way that renders any selected categories redundant,
// remove them from the categoriesSelectedVar
export const useUpdateCategoriesSelectedVar = wordlistCategories => {
  const categoriesSelected = useReactiveVar(categoriesSelectedVar);

  useEffect(() => {
    const isIncludedCategoryInWordlist = categoryId => {
      return wordlistCategories.some(({ id }) => id === categoryId);
    };

    const nonOrphanedSelectedCategories = categoriesSelected.filter(isIncludedCategoryInWordlist);
    if (nonOrphanedSelectedCategories.sort().toString() !== categoriesSelected.sort().toString()) {
      categoriesSelectedVar(nonOrphanedSelectedCategories);
    }
  }, [categoriesSelected, wordlistCategories]);
};
