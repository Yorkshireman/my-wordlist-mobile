import { ClearIcon } from './ClearIcon';
import { MY_WORDLIST } from '../graphql-queries';
import PropTypes from 'prop-types';
import { sanitiseText } from '../utils';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useAsyncStorage, useWordlistEntryUpdate } from '../hooks';
import { useEffect, useRef, useState } from 'react';

export const EditWordForm = ({ setEditWordFormVisible }) => {
  const currentAuthToken = useAsyncStorage();
  const { data: { myWordlist: { entries } } } = useQuery(MY_WORDLIST);
  const { params: { id } } = useRoute();
  const ref = useRef();
  const wordlistEntry = entries.find(entry => entry.id === id);
  const { word: { text } } = wordlistEntry;
  const [validationError, setValidationError] = useState();
  const [wordInputValue, setWordInputValue] = useState(text);
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  useEffect(() => {
    if (validationError) {
      setTimeout(() => {
        ref.current.focus();
      }, 0);
    }
  }, [validationError]);

  const updateWord = () => {
    const sanitisedWordInputValue = sanitiseText(wordInputValue);

    wordlistEntryUpdate({
      optimisticResponse: {
        authToken: currentAuthToken,
        wordlistEntryUpdate: {
          __typename: 'WordlistEntryUpdatePayload',
          wordlistEntry: {
            ...wordlistEntry,
            word: {
              __typename: 'Word',
              createdAt: 'temp-createdAt',
              id: `${sanitisedWordInputValue}-temp-id`,
              text: sanitisedWordInputValue
            },
            wordId: `${sanitisedWordInputValue}-temp-id`
          }
        }
      },
      variables: {
        id,
        wordlistEntryInput: {
          word: {
            text: sanitisedWordInputValue
          }
        }
      }
    });
  };

  return (
    <View style={validationError ? null : { marginBottom: 16 }}>
      <TextInput
        aria-label='word'
        autoCapitalize='none'
        autoFocus
        dense
        error={validationError}
        maxLength={32}
        mode='outlined'
        onChangeText={text => {
          text && setValidationError(null);
          setWordInputValue(sanitiseText(text));
        }}
        onSubmitEditing={() => {
          if (!wordInputValue) return setValidationError('Please enter a word');
          wordInputValue !== text && updateWord();
          setEditWordFormVisible(false);
        }}
        ref={ref}
        right={ClearIcon(() => setWordInputValue(''), wordInputValue.length)}
        spellCheck={false}
        textTransform='lowercase'
        value={wordInputValue}
      />
      {validationError ?
        <HelperText type="error">
          {validationError}
        </HelperText>
        : null
      }
    </View>
  );
};

EditWordForm.propTypes = {
  setEditWordFormVisible: PropTypes.func.isRequired
};
