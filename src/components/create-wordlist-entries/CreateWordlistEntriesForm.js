import PropTypes from 'prop-types';
import { WordlistEntry } from './WordlistEntry';
import { Button, IconButton } from 'react-native-paper';
import { useAsyncStorage, useWordlistEntriesCreate } from '../../hooks';
import { useEffect, useState } from 'react';

const defaultWordlistEntries = [
  {
    categories: [],
    word: {
      text: ''
    }
  }
];

export const CreateWordlistEntriesForm = ({ setModalVisible, wordlistId }) => {
  const currentAuthToken = useAsyncStorage();
  const [addWordlistEntryButtonIsDisabled, setAddWordlistEntryButtonIsDisabled] = useState(true);
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [wordlistEntries, setWordlistEntries] = useState(defaultWordlistEntries);
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, wordlistEntries, wordlistId });

  useEffect(() => {
    if (wordlistEntries.every(wordlistEntry => wordlistEntry?.word?.text?.length)) {
      setAddWordlistEntryButtonIsDisabled(false);
      setSubmitButtonIsDisabled(false);
    } else {
      setAddWordlistEntryButtonIsDisabled(true);
      setSubmitButtonIsDisabled(true);
    }
  }, [setSubmitButtonIsDisabled, wordlistEntries]);

  const onSubmit = () => {
    wordlistEntriesCreate({
      variables: {
        wordlistEntries
      }
    });

    setWordlistEntries(defaultWordlistEntries);
    setModalVisible(false);
  };

  return (
    <>
      {wordlistEntries.map(({ word }, i) =>
        <WordlistEntry index={i} key={i} setWordlistEntries={setWordlistEntries} word={word} />
      )}
      <IconButton
        disabled={addWordlistEntryButtonIsDisabled}
        icon="camera"
        onPress={() => setWordlistEntries([...wordlistEntries, { categories: [], word: { text: '' }}])}
        size={20}
      />
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={submitButtonIsDisabled}
        icon='send'
        mode='contained'
        onPress={onSubmit}
      >
        Add
      </Button>
    </>
  );
};

CreateWordlistEntriesForm.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  wordlistId: PropTypes.string.isRequired
};
