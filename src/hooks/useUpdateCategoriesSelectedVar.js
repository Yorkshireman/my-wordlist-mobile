import { categoriesSelectedVar } from '../reactiveVars';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

// if wordlist categories have changed, rendering any selected categories redundant, remove them
// from the categoriesSelectedVar
export const useUpdateCategoriesSelectedVar = wordlistCategories => {
  const categoriesSelected = useReactiveVar(categoriesSelectedVar);

  useEffect(() => {
    const isIncludedCategoryInWordlist = categoryId => {
      return wordlistCategories.some(({ id }) => id === categoryId);
    };

    const filteredCategoriesSelected = categoriesSelected.filter(isIncludedCategoryInWordlist);
    if (filteredCategoriesSelected.sort().toString() !== categoriesSelected.sort().toString()) {
      categoriesSelectedVar(filteredCategoriesSelected);
    }
  }, [categoriesSelected, wordlistCategories]);
};
