import { snackbarStateVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useSnackbar } from '../hooks';
import { EmitterSubscription, Keyboard, Platform } from 'react-native';
import { ReactNode, useEffect, useState } from 'react';
import { Snackbar, useTheme } from 'react-native-paper';

type Route = {
  params?: {
    isModal?: boolean;
  };
};

const useIsModal = () => {
  const route: Route = useRoute();
  const { isModal } = route.params || {};
  return Boolean(isModal);
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { hideSnackbar } = useSnackbar();
  const {
    colors: { error: errorColour, primary }
  } = useTheme();

  const { duration, error, key, message, visible } = useReactiveVar(snackbarStateVar);
  const isModal = useIsModal();

  useEffect(() => {
    let keyboardDidShowListener: EmitterSubscription;
    let keyboardDidHideListener: EmitterSubscription;
    if (Platform.OS === 'ios') {
      keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', ({ endCoordinates }) =>
        setKeyboardHeight(endCoordinates.height)
      );
      keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () =>
        setKeyboardHeight(0)
      );
    }

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  const backgroundColor = error ? errorColour : primary;
  const marginBottom = keyboardHeight + 7 + (isModal && Platform.OS === 'ios' ? 20 : 0);

  return (
    <>
      {children}
      <Snackbar
        duration={duration}
        key={key}
        onDismiss={() => hideSnackbar()}
        style={{ backgroundColor, marginBottom }}
        visible={visible}
      >
        {message}
      </Snackbar>
    </>
  );
};
