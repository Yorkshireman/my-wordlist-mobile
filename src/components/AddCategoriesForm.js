import { ClearIcon } from './ClearIcon';
import { MY_WORDLIST } from '../graphql-queries';
import { parseCategories } from '../utils';
import { TextInput } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { HelperText, IconButton, Text } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useWordlistEntryUpdate } from '../hooks';

export const AddCategoriesForm = () => {
  const currentAuthToken = useAsyncStorage();
  const { data: { myWordlist: { entries } } } = useQuery(MY_WORDLIST);
  const { params: { id } } = useRoute();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  const addCategories = () => {
    const wordlistEntry = entries.find(entry => entry.id === id);
    const { categories: existingCategories } = wordlistEntry;
    const newCategories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    const categories = [...existingCategories, ...newCategories.map(cat => ({ ...cat, id: `${cat.name}-id` }))];

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
          categories: [...existingCategories, ...newCategories]
        }
      }
    });

    setUnparsedCategoriesText('');
  };

  return (
    <>
      <TextInput
        aria-label='categories'
        autoCapitalize='none'
        dense
        label='add category'
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
    </>
  );
};

const styles = StyleSheet.create({
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
  }
});
