import { ClearIcon } from './ClearIcon';
import { TextInput } from 'react-native-paper';
import { useAddCategories } from '../hooks';
import { HelperText, IconButton, Text } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const AddCategoriesForm = () => {
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  const addCategories = useAddCategories({ unparsedCategoriesText });

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
