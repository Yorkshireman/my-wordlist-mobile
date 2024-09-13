import { makeVar } from '@apollo/client';

export const selectedCategoriesIdsVar = makeVar<string[]>([]);

export const snackbarStateVar = makeVar({
  duration: 5000,
  error: false,
  key: 0,
  message: '',
  visible: false
});
