import PropTypes from 'prop-types';
import { snackbarStateVar } from '../reactiveVars';
import { useReactiveVar } from '@apollo/client';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';

export const NotificationProvider = ({ children }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { colors: { primary } } = useTheme();
  const snackbarState = useReactiveVar(snackbarStateVar);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => setKeyboardHeight(e.endCoordinates.height - 30)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const { duration, key, message, visible } = snackbarState;

  return (
    <>
      {children}
      <View style={styles.snackbarWrapper}>
        <Snackbar
          duration={duration}
          key={key}
          onDismiss={() => snackbarStateVar({ ...snackbarState, visible: false })}
          style={{ backgroundColor: primary, marginBottom: keyboardHeight }}
          visible={visible}
        >
          {message}
        </Snackbar>
      </View>
    </>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
  snackbarWrapper: {
    marginBottom: 7,
    marginTop: 'auto'
  }
});
