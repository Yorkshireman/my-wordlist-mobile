import PropTypes from 'prop-types';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';
import { WORDLIST_ENTRY_CREATE } from '../graphql-queries';
import { Button, TextInput } from 'react-native-paper';
import { useAsyncStorage, useInputRef, useWordText } from '../hooks';
import { useRef, useState } from 'react';

const buildOptimisticResponse = ({ currentAuthToken, wordText, wordlistId }) => {
  return {
    authToken: currentAuthToken,
    wordlistEntryCreate: {
      __typename: 'WordlistEntryCreatePayload',
      wordlistEntry: {
        __typename: 'WordlistEntry',
        categories: [],
        createdAt: 'temp-createdAt',
        id: 'temp-id',
        word: {
          __typename: 'Word',
          createdAt: 'temp-createdAt',
          id: 'temp-id',
          text: wordText.trim()
        },
        wordId: 'temp-wordId',
        wordlistId
      }
    }
  };
};

export const CreateWordlistEntryForm = ({ setModalVisible, wordlistId }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);
  const [wordText, setWordText] = useState('');
  useWordText(wordText, setDisabled);

  const [wordlistEntryCreate] = useMutation(WORDLIST_ENTRY_CREATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    },
    optimisticResponse: buildOptimisticResponse({ currentAuthToken, wordText, wordlistId }),
    update(cache, { data: { wordlistEntryCreate: { wordlistEntry } } }) {
      cache.modify({
        fields: {
          entries(existingEntryRefs = []) {
            const newEntryRef = cache.writeFragment({
              data: wordlistEntry,
              fragment: WORDLIST_ENTRY
            });

            return [newEntryRef, ...existingEntryRefs];
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistEntry.wordlistId })
      });
    }
  });

  const onSubmit = () => {
    // parse categories input value
    const categories = parseMultipleCategories
    wordlistEntryCreate({ variables: { categories: word: wordText.trim() }});
    setWordText('');
    setModalVisible(false);
  };

  return (
    <>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => setWordText(text)}
        ref={textInputRef}
        textTransform='lowercase'
        value={wordText}
      />
      <TextInput
        label='categories'
        mode='outlined'
        onChangeText={text => setUnparsedCategoriesText(text)}
        textTransform='lowercase'
        value={unparsedCategoriesText}
      />
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
  setModalVisible: PropTypes.func.isRequired,
  wordlistId: PropTypes.string.isRequired
};
