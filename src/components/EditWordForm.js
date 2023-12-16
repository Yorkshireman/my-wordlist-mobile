import { ClearIcon } from './ClearIcon';
import { MY_WORDLIST } from '../graphql-queries';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useWordlistEntryUpdate } from '../hooks';

export const EditWordForm = ({ setEditWordFormVisible }) => {
  const currentAuthToken = useAsyncStorage();
  const { data: { myWordlist: { entries } } } = useQuery(MY_WORDLIST);
  const { params: { id } } = useRoute();
  const wordlistEntry = entries.find(entry => entry.id === id);
  const { word: { text } } = wordlistEntry;
  const [wordInputValue, setWordInputValue] = useState(text);
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  const updateWord = () => {
    const sanitisedWordInputValue = wordInputValue.trim().toLowerCase();

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
    <View style={styles.wordInputWrapper}>
      <TextInput
        aria-label='word'
        autoCapitalize='none'
        autoFocus
        dense
        maxLength={32}
        mode='outlined'
        onChangeText={text => setWordInputValue(text.toLowerCase())}
        onSubmitEditing={() => {
          wordInputValue !== text && updateWord();
          setEditWordFormVisible(false);
        }}
        right={ClearIcon(() => setWordInputValue(''), wordInputValue.length)}
        spellCheck={false}
        textTransform='lowercase'
        value={wordInputValue}
      />
    </View>
  );
};

EditWordForm.propTypes = {
  setEditWordFormVisible: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  wordInputWrapper: {
    marginBottom: 16
  }
});