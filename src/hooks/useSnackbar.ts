import { snackbarStateVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';

export const useSnackbar = () => {
  const snackbarState = useReactiveVar(snackbarStateVar);

  const showSnackbar = ({
    duration = 5000,
    error = false,
    message
  }: {
    duration?: number;
    error?: boolean;
    message: string;
  }) => {
    snackbarStateVar({
      ...snackbarState,
      duration,
      error,
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
