import PropTypes from 'prop-types';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';
import { WORDLIST_ENTRY_CREATE } from '../graphql-queries';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
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
  const inputRef = useRef();
  useInputRef(inputRef);
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
    wordlistEntryCreate({ variables: { word: wordText.trim() }});
    setWordText('');
    setModalVisible(false);
  };

  return (
    <View>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => setWordText(text)}
        ref={inputRef}
        styles={styles.input}
        textTransform='lowercase'
        value={wordText}
      />
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={disabled}
        icon='send'
        mode='contained'
        onPress={onSubmit}
        styles={{ marginTop: 16 }}
      >
        Add
      </Button>
    </View>
  );
};

CreateWordlistEntryForm.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  wordlistId: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16
  }
});
