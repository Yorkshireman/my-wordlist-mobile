import { CreateWordlistEntryForm } from '../components/CreateWordlistEntryForm';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useState } from 'react';
import { Snackbar, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const CreateWordlistEntriesScreen = ({ navigation }) => {
  const { data } = useAuthToken(navigation);
  const { colors: { primary } } = useTheme();
  const [snackbarKey, setSnackbarKey] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  if (!data) return null;

  return (
    <View style={{ ...sharedStyles.container, ...styles.wrapper }}>
      <Text style={styles.title}>Add Word</Text>
      <Text onPress={() => navigation.navigate('Home')} style={styles.close}>Close</Text>
      <CreateWordlistEntryForm setSnackbarKey={setSnackbarKey} setSnackbarVisible={setSnackbarVisible} wordlistId={data.myWordlist.id} />
      <View style={styles.snackbarWrapper}>
        <Snackbar
          duration={3000}
          key={snackbarKey}
          onDismiss={() => setSnackbarVisible(false)}
          style={{ backgroundColor: primary }}
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
  close: { fontSize: 16, position: 'absolute', right: 20, top: 20 },
  snackbarWrapper: { marginTop: 'auto' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  wrapper: { justifyContent: 'flex-start', marginTop: 10, padding: 20 }
});
