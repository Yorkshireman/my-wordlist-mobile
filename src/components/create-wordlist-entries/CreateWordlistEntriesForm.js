import { isValidWordlistEntry } from '../../utils';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-web';
import { WordlistEntry } from './WordlistEntry';
import { Button, IconButton } from 'react-native-paper';
import { useAsyncStorage, useWordlistEntriesCreate } from '../../hooks';
import { useEffect, useState } from 'react';

export const CreateWordlistEntriesForm = ({ setModalVisible, setWordlistEntries, wordlistEntries, wordlistId }) => {
  const [addWordlistEntryButtonIsDisabled, setAddWordlistEntryButtonIsDisabled] = useState(true);
  const currentAuthToken = useAsyncStorage();
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, wordlistEntries, wordlistId });

  useEffect(() => {
    if (wordlistEntries.every(isValidWordlistEntry)) {
      setAddWordlistEntryButtonIsDisabled(false);
    } else {
      setAddWordlistEntryButtonIsDisabled(true);
    }

    if (wordlistEntries.find(isValidWordlistEntry)) {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }
  }, [setSubmitButtonIsDisabled, wordlistEntries]);

  const onSubmit = () => {
    wordlistEntriesCreate({
      variables: {
        wordlistEntries: wordlistEntries.filter(isValidWordlistEntry)
      }
    });

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
  setWordlistEntries: PropTypes.func.isRequired,
  wordlistEntries: PropTypes.arrayOf(PropTypes.shape({
    categories: PropTypes.array.isRequired,
    word: PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  })).isRequired,
  wordlistId: PropTypes.string.isRequired
};
