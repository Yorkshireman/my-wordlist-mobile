import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { WordlistEntry } from './WordlistEntry';
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
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [wordlistEntries, setWordlistEntries] = useState(defaultWordlistEntries);
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, wordlistEntries, wordlistId });

  useEffect(() => {
    if (wordlistEntries.find(wordlistEntry => wordlistEntry?.word?.text?.length)) {
      setSubmitButtonIsDisabled(false);
    } else {
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
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon='send'
        mode='contained'
        onPress={onSubmit}
        submitButtonIsDisabled={submitButtonIsDisabled}
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
