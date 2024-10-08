import { snackbarStateVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';
import { useSnackbar } from '../hooks';
import { EmitterSubscription, Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';

export const NotificationProvider = ({ children }: { children: React.ReactElement }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { hideSnackbar } = useSnackbar();
  const {
    colors: { error: errorColour, primary }
  } = useTheme();

  const { duration, error, key, message, visible } = useReactiveVar(snackbarStateVar);

  useEffect(() => {
    let keyboardDidShowListener: EmitterSubscription;
    let keyboardDidHideListener: EmitterSubscription;
    if (Platform.OS === 'ios') {
      keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', ({ endCoordinates }) =>
        setKeyboardHeight(endCoordinates.height - 30)
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
  return (
    <>
      {children}
      <View style={styles.snackbarWrapper}>
        <Snackbar
          duration={duration}
          key={key}
          onDismiss={() => hideSnackbar()}
          style={{ backgroundColor, marginBottom: keyboardHeight }}
          visible={visible}
        >
          {message}
        </Snackbar>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  snackbarWrapper: {
    marginBottom: 7,
    marginTop: 'auto'
  }
});
