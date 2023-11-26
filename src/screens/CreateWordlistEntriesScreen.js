import { CreateWordlistEntryForm } from '../components/CreateWordlistEntryForm';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Snackbar, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';

export const CreateWordlistEntriesScreen = ({ navigation }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { colors: { primary } } = useTheme();
  const [snackbarKey, setSnackbarKey] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

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

  return (
    <View style={{ ...sharedStyles.container, ...styles.wrapper }}>
      <Text style={styles.title}>Add Word</Text>
      <Text onPress={() => navigation.navigate('Home')} style={styles.close}>Close</Text>
      <CreateWordlistEntryForm
        setSnackbarKey={setSnackbarKey}
        setSnackbarVisible={setSnackbarVisible}
      />
      <View style={styles.snackbarWrapper}>
        <Snackbar
          duration={3000}
          key={snackbarKey}
          onDismiss={() => setSnackbarVisible(false)}
          style={{ backgroundColor: primary, marginBottom: keyboardHeight }}
          visible={snackbarVisible}
        >
          Word added!
        </Snackbar>
      </View>
    </View>
  );
};

CreateWordlistEntriesScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  close: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    top: 20
  },
  snackbarWrapper: {
    marginTop: 'auto'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center'
  },
  wrapper: {
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 20
  }
});
