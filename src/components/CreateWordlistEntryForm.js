import { ClearIcon } from './ClearIcon';
import { parseCategories } from '../utils';
import PropTypes from 'prop-types';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useInputRef, useWordlistEntriesCreate, useWordText } from '../hooks';
import { useRef, useState } from 'react';

export const CreateWordlistEntryForm = ({ setSnackbarKey, setSnackbarVisible, wordlistId }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);
  const [wordText, setWordText] = useState('');
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, unparsedCategoriesText, wordText, wordlistId });
  useWordText(wordText, setDisabled, textInputRef);

  const onSubmit = () => {
    const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    wordlistEntriesCreate({
      variables: {
        wordlistEntries: [
          {
            categories,
            word: {
              text: wordText.trim()
            }
          }
        ]
      }
    });

    setUnparsedCategoriesText('');
    setWordText('');
    setSnackbarKey(prevKey => prevKey + 1);
    setSnackbarVisible(true);
  };

  return (
    <>
      <TextInput
        autoCapitalize='none'
        label='new word'
        mode='outlined'
        onChangeText={text => setWordText(text)}
        ref={textInputRef}
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

CreateWordlistEntryForm.propTypes = {
  setSnackbarKey: PropTypes.func,
  setSnackbarVisible: PropTypes.func,
  wordlistId: PropTypes.string.isRequired
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
