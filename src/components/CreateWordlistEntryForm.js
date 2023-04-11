import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Button, TextInput } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_CREATE } from '../graphql-queries';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

export const CreateWordlistEntryForm = ({ setModalVisible }) => {
  const [disabled, setDisabled] = useState(true);
  const [wordText, setWordText] = useState('');
  const [wordlistEntryCreate, { data, loading }] = useMutation(WORDLIST_ENTRY_CREATE, {
    refetchQueries: [
      {query: MY_WORDLIST},
      'MyWordlist'
    ]
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
      console.log('data: ', JSON.stringify(data, null, 2));
    }
  }, [data, setModalVisible]);

  const onSubmit = () => {
    wordlistEntryCreate({ variables: { word: wordText }});
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
