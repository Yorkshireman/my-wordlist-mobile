import { ClearIcon } from './ClearIcon';
import { useRoute } from '@react-navigation/native';
import { useSnackbar } from '../hooks';
import { useState } from 'react';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { parseCategories, sanitiseText } from '../utils';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useWordlistEntriesCreate, useWordText } from '../hooks';

export const CreateWordlistEntryForm = () => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  const { params: { wordlistId } } = useRoute();
  const { showSnackbar } = useSnackbar();
  const [wordText, setWordText] = useState('');
  const wordlistEntriesCreate = useWordlistEntriesCreate({
    currentAuthToken,
    unparsedCategoriesText,
    wordText,
    wordlistId
  });
  useWordText(wordText, setDisabled);

  const onSubmit = () => {
    const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    const text = sanitiseText(wordText);

    wordlistEntriesCreate({
      variables: {
        wordlistEntries: [
          {
            categories,
            word: {
              text
            }
          }
        ]
      }
    });

    setUnparsedCategoriesText('');
    showSnackbar(`"${text}" added!`);
    setWordText('');
  };

  return (
    <>
      <TextInput
        autoCapitalize='none'
        autoFocus
        label='new word'
        mode='outlined'
        onChangeText={text => setWordText(sanitiseText(text))}
        right={ClearIcon(() => setWordText(''), wordText.length)}
        testID='new-word-text-input-field'
        textTransform='lowercase'
        value={wordText}
      />
      <TextInput
        autoCapitalize='none'
        label='categories (optional)'
        mode='outlined'
        onChangeText={text => setUnparsedCategoriesText(text)}
        right={ClearIcon(() => setUnparsedCategoriesText(''), unparsedCategoriesText.length)}
        testID='categories-text-input-field'
        textTransform='lowercase'
        value={unparsedCategoriesText}
      />
      <View style={styles.helperTextWrapper}>
        <IconButton icon='information-outline' size={16} style={styles.helperTextIcon} />
        <HelperText style={styles.helperText} variant='bodySmall'>
          <Text>separate categories with a comma</Text>
        </HelperText>
      </View>
      <Button
        contentStyle={styles.submitButtonContent}
        disabled={disabled}
        icon='send'
        mode='contained'
        onPress={onSubmit}
      >
        Add
      </Button>
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
  },
  submitButtonContent: { flexDirection: 'row-reverse' }
});
