import { selectedCategoriesVar } from '../reactiveVars';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

// if wordlist categories have changed in such a way that renders any selected categories redundant,
// remove them from the selectedCategoriesVar
export const useUpdateCategoriesSelectedVar = wordlistCategories => {
  const selectedCategories = useReactiveVar(selectedCategoriesVar);

  useEffect(() => {
    const isIncludedCategoryInWordlist = categoryId => {
      return wordlistCategories.some(({ id }) => id === categoryId);
    };

    const nonOrphanedSelectedCategories = selectedCategories.filter(isIncludedCategoryInWordlist);
    if (nonOrphanedSelectedCategories.sort().toString() !== selectedCategories.sort().toString()) {
      selectedCategoriesVar(nonOrphanedSelectedCategories);
    }
  }, [selectedCategories, wordlistCategories]);
};
