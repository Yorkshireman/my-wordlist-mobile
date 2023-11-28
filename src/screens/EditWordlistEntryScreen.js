import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useWordlistEntryId } from '../hooks';
import { WORDLIST_ENTRY_UPDATE } from '../graphql-queries';
import { Chip, IconButton, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const EditWordlistEntryScreen = ({ navigation }) => {
  const { params: { id } } = useRoute();
  const wordlistEntry = useWordlistEntryId(id);
  const { categories, word: { text } } = wordlistEntry;
  const [wordlistEntryUpdate] = useMutation(WORDLIST_ENTRY_UPDATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    }
  });

  const deleteCategory = _id => {
    wordlistEntryUpdate({
      variables: {
        id,
        wordlistEntryInput: {
          categories: wordlistEntry.categories.filter(({ id }) => id !== _id)
        }
      }
    });
  };

  return (
    <View style={{ ...sharedStyles.container, ...styles.wrapper }}>
      <Text style={styles.title}>Edit</Text>
      <Text onPress={() => navigation.navigate('Home')} style={styles.close}>Close</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center' }}>
          <Text variant={'titleLarge'}>{text}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <IconButton
            icon='note-edit-outline'
            onPress={() => navigation.navigate('EditWordlistEntry', { id })}
            size={22}
            style={{ margin: 0 }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {categories.map(({ id, name }) => {
          return (
            <Chip closeIconAccessibilityLabel={`delete-${name}-category`} compact key={id} onClose={() => deleteCategory(id)}>
              <Text variant='bodyLarge'>{name}</Text>
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

EditWordlistEntryScreen.propTypes = {
  navigation: PropTypes.object.isRequired
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
