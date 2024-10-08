import { CreateWordlistEntriesScreenProps } from '../../types';
import { CreateWordlistEntryForm } from '../components';
import sharedStyles from '../styles';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const CreateWordlistEntriesScreen = ({ navigation }: CreateWordlistEntriesScreenProps) => {
  return (
    <View style={{ ...sharedStyles.container, ...styles.wrapper }}>
      <Text style={styles.title}>Add Word</Text>
      <Text onPress={() => navigation.navigate('Home')} style={styles.close}>
        Back
      </Text>
      <CreateWordlistEntryForm />
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    top: 20
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
