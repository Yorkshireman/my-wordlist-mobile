import PropTypes from 'prop-types';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { WORDLIST_ENTRY_UPDATE } from '../graphql-queries';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { useWordlistEntryId, useWordText } from '../hooks';

export const AddCategories = ({ id, onDismiss, setVisible }) => {
  const [disabled, setDisabled] = useState(true);
  const { existingCategories, wordText } = useWordlistEntryId(id);
  const [text, setText] = useState('');
  useWordText(text, setDisabled);
  const [wordlistEntryUpdate, { loading }] = useMutation(WORDLIST_ENTRY_UPDATE, {
    onCompleted: ({ authToken }) => {
      setVisible(false);
      setText('');
      storeAuthToken(authToken);
    }
  });

  const onSubmit = () => {
    wordlistEntryUpdate({
      variables: {
        id,
        wordlistEntryInput: {
          categories: [
            ...existingCategories,
            { name: text.trim() }
          ]
        }
      }
    });
  };

  return (
    <Portal>
      <Modal
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
        onDismiss={onDismiss}
        visible
      >
        <Text variant='bodyLarge'>Add a category to &quot;{wordText}&quot;</Text>
        <TextInput
          label='category'
          mode='outlined'
          onChangeText={setText}
          value={text}
        />
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          disabled={disabled}
          icon='send'
          loading={loading}
          mode='contained'
          onPress={onSubmit}
        >
          Add
        </Button>
      </Modal>
    </Portal>
  );
};

AddCategories.propTypes = {
  id: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};
