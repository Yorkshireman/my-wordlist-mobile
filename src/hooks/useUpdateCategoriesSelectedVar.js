import { categoriesSelectedVar } from '../reactiveVars';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

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
