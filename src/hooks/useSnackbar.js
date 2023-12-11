import { snackbarStateVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';

export const useSnackbar = () => {
  const snackbarState = useReactiveVar(snackbarStateVar);

  const showSnackbar = (message, duration = 3000) => {
    snackbarStateVar({
      ...snackbarState,
      duration,
      key: snackbarState.key + 1,
      message,
      visible: true
    });
  };

  const hideSnackbar = () => {
    snackbarStateVar({ ...snackbarState, visible: false });
  };

  return { hideSnackbar, showSnackbar };
};
