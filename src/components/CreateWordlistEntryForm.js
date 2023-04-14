import PropTypes from 'prop-types';
import { WORDLIST_ENTRY_CREATE } from '../graphql-queries';
import { Button, TextInput } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

export const CreateWordlistEntryForm = ({ setModalVisible }) => {
  const [disabled, setDisabled] = useState(true);
  const [wordText, setWordText] = useState('');
  const [wordlistEntryCreate, { data, loading }] = useMutation(WORDLIST_ENTRY_CREATE, {
    update(cache, { data: { wordlistEntryCreate: { wordlistEntry } } }) {
      cache.modify({
        fields: {
          entries(existingEntryRefs = []) {
            const newEntryRef = cache.writeFragment({
              data: wordlistEntry,
              fragment: gql`
              fragment NewWordlistEntry on WordlistEntry {
                createdAt
                id
                wordlistId
                word {
                  createdAt
                  id
                  text
                }
              }
              `
            });

            return [newEntryRef, ...existingEntryRefs];
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistEntry.wordlistId  })
      });
    }
  });

  useEffect(() => {
    if (wordText.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [wordText]);

  useEffect(() => {
    if (data) {
      setWordText('');
      setModalVisible(false);
      // TODO: store authToken
    }
  }, [data, setModalVisible]);

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
