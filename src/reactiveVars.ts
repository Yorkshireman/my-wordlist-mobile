import { makeVar } from '@apollo/client';
import { MyWordlistOptions } from '../types';

export const myWordlistOptionsVar = makeVar<MyWordlistOptions>({});

export const selectedCategoriesIdsVar = makeVar<string[]>([]);

export const snackbarStateVar = makeVar({
  duration: 5000,
  key: 0,
  message: '',
  visible: false
});
