import { MY_WORDLIST } from '../graphql-queries';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAsyncStorage } from '../hooks';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useWordlistEntryUpdate } from '../hooks';
import { AddCategoriesForm, EditWordForm } from '../components';
import { Chip, IconButton, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const EditWordlistEntryScreen = ({ navigation }) => {
  const currentAuthToken = useAsyncStorage();
  const [editWordFormVisible, setEditWordFormVisible] = useState(false);
  const { data: { myWordlist: { entries } } } = useQuery(MY_WORDLIST);
  const { params: { id } } = useRoute();
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  const wordlistEntry = entries.find(entry => entry.id === id);
  const { categories, word: { text } } = wordlistEntry;

  const deleteCategory = _id => {
    const categories = wordlistEntry.categories.filter(({ id }) => id !== _id);

    wordlistEntryUpdate({
      optimisticResponse: {
        authToken: currentAuthToken,
        wordlistEntryUpdate: {
          __typename: 'WordlistEntryUpdatePayload',
          wordlistEntry: {
            ...wordlistEntry,
            categories: categories.map(cat => ({ __typename: 'Category', ...cat }))
          }
        }
      },
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
      {editWordFormVisible ?
        <EditWordForm setEditWordFormVisible={setEditWordFormVisible} />
        :
        <View style={styles.wordWrapper}>
          <View style={{ justifyContent: 'center' }}>
            <Text variant={'titleLarge'}>{text}</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <IconButton
              icon='note-edit-outline'
              onPress={() => setEditWordFormVisible(true)}
              size={22}
              style={{ margin: 0 }}
              testID='edit-word-button'
            />
          </View>
        </View>}
      <AddCategoriesForm />
      <View style={styles.categoryChipsWrapper}>
        {categories.map(({ id, name }) => {
          return (
            <Chip
              closeIconAccessibilityLabel={`delete-${name}-category`}
              compact key={id}
              onClose={() => deleteCategory(id)}
              style={styles.chip}
            >
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
  categoryChipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5
  },
  chip: {
    marginRight: 2.5
  },
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
  wordWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12
  },
  wrapper: {
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 20
  }
});
