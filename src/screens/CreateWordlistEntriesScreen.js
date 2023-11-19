import { CreateWordlistEntryForm } from '../components/CreateWordlistEntryForm';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useState } from 'react';
import { View } from 'react-native';
import { Snackbar, Text, useTheme } from 'react-native-paper';

export const CreateWordlistEntriesScreen = ({ navigation }) => {
  const { data } = useAuthToken(navigation);
  const { colors: { primary } } = useTheme();
  const [snackbarKey, setSnackbarKey] = useState(0);
  const [visible, setVisible] = useState(false);

  if (!data) return null;

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', marginTop: 10, padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' }}>Add Word</Text>
      <Text onPress={() => navigation.navigate('Home')} style={{ fontSize: 16, position: 'absolute', right: 20 }}>Close</Text>
      <CreateWordlistEntryForm setSnackbarKey={setSnackbarKey} setVisible={setVisible} wordlistId={data.myWordlist.id} />
      <View style={{ marginTop: 'auto' }}>
        <Snackbar
          duration={3000}
          key={snackbarKey}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: primary }}
          visible={visible}
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
