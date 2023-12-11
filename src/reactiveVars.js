import { makeVar } from '@apollo/client';

export const snackbarStateVar = makeVar({
  duration: 3000,
  key: 0,
  message: '',
  visible: false
});
