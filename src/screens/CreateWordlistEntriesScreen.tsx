import { CreateWordlistEntriesScreenProps } from '../../types';
import { CreateWordlistEntryForm, ScreenWrapper } from '../components';
import { IconButton, Text } from 'react-native-paper';
import { Platform, StyleSheet } from 'react-native';

export const CreateWordlistEntriesScreen = ({ navigation }: CreateWordlistEntriesScreenProps) => {
  return (
    <ScreenWrapper additionalStyles={styles.wrapper}>
      <Text style={styles.title}>Add Word</Text>
      <IconButton
        aria-label='close'
        icon='close'
        onPress={() => navigation.navigate('Home')}
        style={styles.close}
        testID='close-create-wordlist-entries-screen-icon-button'
      />
      <CreateWordlistEntryForm />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: Platform.OS === 'android' ? 5 : 3,
    top: Platform.OS === 'android' ? 25 : 3
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center'
  },
  wrapper: {
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20
  }
});
