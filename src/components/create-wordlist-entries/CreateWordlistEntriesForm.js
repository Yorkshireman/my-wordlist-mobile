import PropTypes from 'prop-types';
import { sanitiseWordlistEntries } from '../../utils';
import { ScrollView } from 'react-native-web';
import { useState } from 'react';
import { View } from 'react-native';
import { WordlistEntry } from './WordlistEntry';
import { Button, IconButton } from 'react-native-paper';
import { useAsyncStorage, useWordlistEntries, useWordlistEntriesCreate } from '../../hooks';

export const CreateWordlistEntriesForm = ({ setModalVisible, setWordlistEntries, wordlistEntries, wordlistId }) => {
  const [addWordlistEntryButtonIsDisabled, setAddWordlistEntryButtonIsDisabled] = useState(true);
  const currentAuthToken = useAsyncStorage();
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, wordlistEntries, wordlistId });
  useWordlistEntries({ setAddWordlistEntryButtonIsDisabled, setSubmitButtonIsDisabled, wordlistEntries });

  const onSubmit = () => {
    wordlistEntriesCreate({
      variables: {
        wordlistEntries: sanitiseWordlistEntries(wordlistEntries)
      }
    });

    setModalVisible(false);
  };

  return (
    <ScrollView style={{ maxHeight: '95vh' }}>
      {wordlistEntries.map(({ word }, i) =>
        <WordlistEntry index={i} key={i} setWordlistEntries={setWordlistEntries} word={word} />
      )}
      <IconButton
        disabled={addWordlistEntryButtonIsDisabled}
        icon="camera"
        onPress={() => setWordlistEntries([...wordlistEntries, { categories: [], word: { text: '' }}])}
        size={20}
      />
      <View style={{ columnGap: 12, flexDirection: 'row' }}>
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          mode='outlined'
          onPress={() => setModalVisible(false)}
          style={{ flex: 1 } }
        >
          Cancel
        </Button>
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          disabled={submitButtonIsDisabled}
          icon='send'
          mode='contained'
          onPress={onSubmit}
          style={{ flex: 2 } }
        >
          Add
        </Button>
      </View>
    </ScrollView>
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
