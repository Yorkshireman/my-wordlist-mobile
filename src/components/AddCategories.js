import PropTypes from 'prop-types';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { WORDLIST_ENTRY_UPDATE } from '../graphql-queries';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { useAsyncStorage, useInputRef, useWordlistEntryId, useWordText } from '../hooks';
import { useRef, useState } from 'react';

export const AddCategories = ({ id, onDismiss, setVisible }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef(null);
  const [text, setText] = useState('');
  useInputRef(inputRef);
  useWordText(text, setDisabled);
  const wordlistEntry = useWordlistEntryId(id);
  const [wordlistEntryUpdate] = useMutation(WORDLIST_ENTRY_UPDATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    },
    optimisticResponse: {
      authToken: currentAuthToken,
      wordlistEntryUpdate: {
        __typename: 'WordlistEntryUpdatePayload',
        wordlistEntry: {
          __typename: 'WordlistEntry',
          ...wordlistEntry,
          categories: [
            ...wordlistEntry.categories,
            { id: 'temp-id', name: text.trim() }
          ]
        }
      }
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

    setText('');
    setVisible(false);
  };

  const existingCategories = wordlistEntry.categories.map(({ name }) => ({ name }));
  const wordText = wordlistEntry.word.text;

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
          ref={inputRef}
          value={text}
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
