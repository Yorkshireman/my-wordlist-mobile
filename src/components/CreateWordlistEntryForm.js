import { ClearIcon } from './ClearIcon';
import { parseCategories } from '../utils';
import PropTypes from 'prop-types';
import { Button, HelperText, IconButton, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useInputRef, useWordlistEntriesCreate, useWordText } from '../hooks';
import { useRef, useState } from 'react';

export const CreateWordlistEntryForm = ({ wordlistId }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const { colors: { primary } } = useTheme();
  const [snackbarKey, setSnackbarKey] = useState(0);
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);
  const [visible, setVisible] = useState(false);
  const [wordText, setWordText] = useState('');
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, unparsedCategoriesText, wordText, wordlistId });
  useWordText(wordText, setDisabled);

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

    setSnackbarKey(prevKey => prevKey + 1);
    setUnparsedCategoriesText('');
    setVisible(true);
    setWordText('');
    textInputRef.current.focus();
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
      <View style={{ marginTop: 'auto' }}>
        <Snackbar
          duration={3000}
          key={snackbarKey}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: primary }}
          visible={visible}
        >
          Word added!
        </Snackbar>
      </View>
    </>
  );
};

CreateWordlistEntryForm.propTypes = {
  wordlistId: PropTypes.string.isRequired
};
