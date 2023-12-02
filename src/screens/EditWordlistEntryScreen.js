import { ClearIcon } from '../components';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAsyncStorage } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Chip, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_UPDATE } from '../graphql-queries';
import { parseCategories, storeAuthToken } from '../utils';
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
        categories: categories.map(cat => ({ __typename: 'Category', ...cat }))
      }
    }
  };
};

export const EditWordlistEntryScreen = ({ navigation }) => {
  const currentAuthToken = useAsyncStorage();
  const { params: { id } } = useRoute();
  const { data: { myWordlist: { entries } } } = useQuery(MY_WORDLIST);
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  const [wordlistEntryUpdate] = useMutation(WORDLIST_ENTRY_UPDATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    }
  });

  const wordlistEntry = entries.find(entry => entry.id === id);
  const { categories, word: { text } } = wordlistEntry;

  const addCategories = () => {
    const existingCategories = categories;
    const newCategories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    wordlistEntryUpdate({
      optimisticResponse: buildOptimisticResponse({
        categories: [...existingCategories, ...newCategories.map(cat => ({ ...cat, id: `${cat.name}-id` }))],
        currentAuthToken,
        wordlistEntry
      }),
      variables: {
        id,
        wordlistEntryInput: {
          categories: [...existingCategories, ...newCategories]
        }
      }
    });

    setUnparsedCategoriesText('');
  };

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
      <TextInput
        aria-label='categories'
        autoCapitalize='none'
        dense
        maxLength={32}
        mode='outlined'
        onChangeText={text => setUnparsedCategoriesText(text)}
        onSubmitEditing={() => addCategories()}
        right={ClearIcon(() => setUnparsedCategoriesText(''), unparsedCategoriesText.length)}
        spellCheck={false}
        textTransform='lowercase'
        value={unparsedCategoriesText}
      />
      <View style={styles.helperTextWrapper}>
        <IconButton icon='information-outline' size={16} style={styles.helperTextIcon} />
        <HelperText style={styles.helperText} variant='bodySmall'>
          <Text>separate multiple categories with a comma</Text>
        </HelperText>
      </View>
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
    marginRight: 5
  },
  close: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    top: 20
  },
  helperText: {
    marginLeft: -16
  },
  helperTextIcon: {
    margin: 0
  },
  helperTextWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16
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
