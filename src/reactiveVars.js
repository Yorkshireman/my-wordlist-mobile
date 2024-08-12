import { makeVar } from '@apollo/client';

export const selectedCategoriesIdsVar = makeVar([]);

export const snackbarStateVar = makeVar({
  duration: 5000,
  key: 0,
  message: '',
  visible: false
});
