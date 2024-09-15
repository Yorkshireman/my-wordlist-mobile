import { ClearIcon } from './ClearIcon';
import { EditWordlistEntryScreenRouteParams } from '../../types';
import { MY_WORDLIST } from '../graphql-queries';
import { MyWordlist } from '../__generated__/graphql';
import { TextInput } from 'react-native-paper';
import { useAddCategories } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { HelperText, IconButton, Text } from 'react-native-paper';
import { QueryResult, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const AddCategoriesForm = () => {
  const {
    params: { id }
  } = useRoute<EditWordlistEntryScreenRouteParams>();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  const { data }: QueryResult<{ myWordlist: MyWordlist }> = useQuery(MY_WORDLIST);
  const entries = data?.myWordlist?.entries || [];
  const wordlistEntry = entries.find(entry => entry.id === id);
  const addCategories = useAddCategories({
    unparsedCategoriesText,
    wordlistEntryToUpdate: wordlistEntry
  });

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
        onSubmitEditing={() => {
          addCategories();
          setUnparsedCategoriesText('');
        }}
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
