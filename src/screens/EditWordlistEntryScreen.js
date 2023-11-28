import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { storeAuthToken } from '../utils';
import { useAsyncStorage } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { Chip, IconButton, Text } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_UPDATE } from '../graphql-queries';
import { StyleSheet, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';

const buildOptimisticResponse = ({ categories, currentAuthToken, wordlistEntry }) => {
  return {
    authToken: currentAuthToken,
    wordlistEntryUpdate: {
      __typename: 'WordlistEntryUpdatePayload',
      wordlistEntry: {
        __typename: 'WordlistEntry',
        ...wordlistEntry,
        categories
      }
    }
  };
};

export const EditWordlistEntryScreen = ({ navigation }) => {
  const currentAuthToken = useAsyncStorage();
  const { params: { id } } = useRoute();
  const { data: { myWordlist: { entries } } } = useQuery(MY_WORDLIST);
  const [wordlistEntryUpdate] = useMutation(WORDLIST_ENTRY_UPDATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    }
  });

  const wordlistEntry = entries.find(entry => entry.id === id);
  const { categories, word: { text } } = wordlistEntry;

  const deleteCategory = _id => {
    const categories = wordlistEntry.categories.filter(({ id }) => id !== _id);

    wordlistEntryUpdate({
      optimisticResponse: buildOptimisticResponse({ categories, currentAuthToken, wordlistEntry }),
      variables: {
        id,
        wordlistEntryInput: {
          categories
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
