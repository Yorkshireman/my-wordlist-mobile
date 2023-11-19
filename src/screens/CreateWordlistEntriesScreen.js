import { CreateWordlistEntryForm } from '../components/CreateWordlistEntryForm';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { Text } from 'react-native-paper';
import { useAuthToken } from '../hooks';
import { View } from 'react-native';

export const CreateWordlistEntriesScreen = ({ navigation }) => {
  const { data } = useAuthToken(navigation);

  if (!data) return null;

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', marginTop: 10, padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' }}>Add Word</Text>
      <Text onPress={() => navigation.navigate('Home')} style={{ fontSize: 16, position: 'absolute', right: 20 }}>Close</Text>
      <CreateWordlistEntryForm wordlistId={data.myWordlist.id} />
    </View>
  );
};

CreateWordlistEntriesScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
