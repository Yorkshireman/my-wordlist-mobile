import { ClearIcon } from './ClearIcon';
import { MY_WORDLIST } from '../graphql-queries';
import { parseCategories } from '../utils';
import { TextInput } from 'react-native-paper';
import { EditWordlistEntryScreenRouteParams, RootStackParamList } from '../../types';
import { HelperText, IconButton, Text } from 'react-native-paper';
import { MyWordlist, WordlistEntry } from '../__generated__/graphql';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { QueryResult, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useWordlistEntryUpdate } from '../hooks';

export const AddCategoriesForm = () => {
  const currentAuthToken = useAsyncStorage();
  const { data }: QueryResult<{ myWordlist: MyWordlist }> = useQuery(MY_WORDLIST);
  const {
    params: { id }
  } = useRoute<EditWordlistEntryScreenRouteParams>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  const entries = data?.myWordlist?.entries || [];

  const addCategories = () => {
    const wordlistEntry = entries.find(entry => entry.id === id);

    if (!wordlistEntry) {
      return navigation.navigate('Home');
    }

    const { categories: existingCategories } = wordlistEntry;
    const newCategories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    const date = new Date();
    const dateNow = date.toISOString();
    const categories = [
      ...existingCategories,
      ...newCategories.map(cat => ({
        ...cat,
        createdAt: dateNow,
        id: `${cat.name}-id`,
        updatedAt: dateNow
      }))
    ];

    const updatedWordlistEntry: WordlistEntry = {
      ...wordlistEntry,
      categories: categories.map(cat => ({
        __typename: 'Category',
        createdAt: cat.createdAt,
        id: cat.id,
        name: cat.name,
        updatedAt: cat.updatedAt
      }))
    };

    wordlistEntryUpdate({
      optimisticResponse: {
        authToken: currentAuthToken,
        wordlistEntryUpdate: {
          __typename: 'WordlistEntryUpdatePayload',
          wordlistEntry: updatedWordlistEntry
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
        right={ClearIcon(
          () => setUnparsedCategoriesText(''),
          Boolean(unparsedCategoriesText.length)
        )}
        spellCheck={false}
        value={unparsedCategoriesText}
      />
      <View style={styles.helperTextWrapper}>
        <IconButton icon='information-outline' size={16} style={styles.helperTextIcon} />
        <HelperText style={styles.helperText} type='info' variant='bodySmall'>
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
