import { ClearIcon } from './ClearIcon';
import { parseCategories } from '../utils';
import PropTypes from 'prop-types';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { useAsyncStorage, useInputRef, useWordlistEntriesCreate, useWordText } from '../hooks';
import { useRef, useState } from 'react';

export const CreateWordlistEntryForm = ({ setSnackbarKey, setVisible, wordlistId }) => {
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
    setVisible(true);
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
      <HelperText style={{
        marginBottom: 16,
        position: 'relative'
      }} variant='bodySmall'
      >
        <IconButton icon='information-outline' size={16} style={{
          left: 0,
          margin: 0,
          position: 'absolute',
          top: -4
        }}
        />
        <Text style={{ marginLeft: 15 }}>separate categories with a comma</Text>
      </HelperText>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
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
  setSnackbarKey: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  wordlistId: PropTypes.string.isRequired
};
