import { ClearIcon } from './ClearIcon';
import { EditWordFormRouteParams } from '../../types';
import { MY_WORDLIST } from '../graphql-queries';
import { sanitiseText } from '../utils';
import { useRoute } from '@react-navigation/native';
import { HelperText, TextInput } from 'react-native-paper';
import { MyWordlist, WordlistEntry, WordlistEntryFieldsFragment } from '../__generated__/graphql';
import { QueryResult, useQuery } from '@apollo/client';
import { TextInput as RNTextInput, View } from 'react-native';
import { useAsyncStorage, useWordlistEntryUpdate } from '../hooks';
import { useEffect, useRef, useState } from 'react';

export const EditWordForm = ({
  setEditWordFormVisible
}: {
  setEditWordFormVisible: (arg0: boolean) => void;
}) => {
  const currentAuthToken = useAsyncStorage();
  const { data }: QueryResult<{ myWordlist: MyWordlist }> = useQuery(MY_WORDLIST);
  const {
    params: { id }
  } = useRoute<EditWordFormRouteParams>();

  const ref = useRef<RNTextInput>(null);

  const wordlistEntry = data?.myWordlist.entries!.find(entry => entry.id === id) as WordlistEntry;
  const {
    word: { text }
  } = wordlistEntry;

  const [validationError, setValidationError] = useState<string | null>(null);
  const [wordInputValue, setWordInputValue] = useState<string>(text);
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  useEffect(() => {
    if (validationError) {
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    }
  }, [validationError]);

  const updateWord = () => {
    const sanitisedWordInputValue = sanitiseText(wordInputValue);
    const tempWordlistEntry: WordlistEntryFieldsFragment = {
      ...wordlistEntry,
      word: {
        __typename: 'Word',
        createdAt: 'temp-createdAt',
        id: `${sanitisedWordInputValue}-temp-id`,
        text: sanitisedWordInputValue
      },
      wordId: `${sanitisedWordInputValue}-temp-id`
    };

    wordlistEntryUpdate({
      optimisticResponse: {
        authToken: currentAuthToken,
        wordlistEntryUpdate: {
          __typename: 'WordlistEntryUpdatePayload',
          wordlistEntry: tempWordlistEntry
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
        error={Boolean(validationError)}
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
        right={ClearIcon(() => setWordInputValue(''), Boolean(wordInputValue.length))}
        spellCheck={false}
        value={wordInputValue}
      />
      {validationError ? <HelperText type='error'>{validationError}</HelperText> : null}
    </View>
  );
};
