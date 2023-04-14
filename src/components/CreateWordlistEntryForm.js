import { NEW_WORDLIST_ENTRY } from '../fragments';
import PropTypes from 'prop-types';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useWordText } from '../hooks';
import { WORDLIST_ENTRY_CREATE } from '../graphql-queries';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const CreateWordlistEntryForm = ({ setModalVisible }) => {
  const [disabled, setDisabled] = useState(true);
  const [wordText, setWordText] = useState('');
  useWordText(wordText, setDisabled);
  const [wordlistEntryCreate, { loading }] = useMutation(WORDLIST_ENTRY_CREATE, {
    onCompleted: ({ authToken }) => {
      setModalVisible(false);
      setWordText('');
      storeAuthToken(authToken);
    },
    update(cache, { data: { wordlistEntryCreate: { wordlistEntry } } }) {
      cache.modify({
        fields: {
          entries(existingEntryRefs = []) {
            const newEntryRef = cache.writeFragment({
              data: wordlistEntry,
              fragment: NEW_WORDLIST_ENTRY
            });

            return [newEntryRef, ...existingEntryRefs];
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistEntry.wordlistId  })
      });
    }
  });

  const onSubmit = () => {
    wordlistEntryCreate({ variables: { word: wordText.trim() }});
  };

  return (
    <View>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={setWordText}
        styles={styles.input}
        value={wordText}
      />
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={disabled}
        icon='send'
        loading={loading}
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
  setModalVisible: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16
  }
});
