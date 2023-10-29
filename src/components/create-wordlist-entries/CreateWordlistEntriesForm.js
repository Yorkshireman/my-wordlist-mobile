import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-web';
import { useState } from 'react';
import { View } from 'react-native';
import { WordlistEntry } from './WordlistEntry';
import { Button, IconButton } from 'react-native-paper';
import { useAsyncStorage, useUnsanitisedWordlistEntries, useWordlistEntriesCreate } from '../../hooks';

export const CreateWordlistEntriesForm = ({ setModalVisible, setUnsanitisedWordlistEntries, unsanitisedWordlistEntries, wordlistId }) => {
  const [addWordlistEntryButtonIsDisabled, setAddWordlistEntryButtonIsDisabled] = useState(true);
  const currentAuthToken = useAsyncStorage();
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const sanitisedWordlistEntries = useUnsanitisedWordlistEntries({ setAddWordlistEntryButtonIsDisabled, setSubmitButtonIsDisabled, unsanitisedWordlistEntries });
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, sanitisedWordlistEntries, wordlistId });

  const onSubmit = () => {
    wordlistEntriesCreate({
      variables: {
        wordlistEntries: sanitisedWordlistEntries
      }
    });

    setModalVisible(false);
  };

  return (
    <ScrollView style={{ maxHeight: '95vh' }}>
      {unsanitisedWordlistEntries.map(({ word }, i) =>
        <WordlistEntry index={i} key={i} setUnsanitisedWordlistEntries={setUnsanitisedWordlistEntries} word={word} />
      )}
      <IconButton
        disabled={addWordlistEntryButtonIsDisabled}
        icon="camera"
        onPress={() => setUnsanitisedWordlistEntries([...unsanitisedWordlistEntries, { categories: [], word: { text: '' }}])}
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
  setUnsanitisedWordlistEntries: PropTypes.func.isRequired,
  unsanitisedWordlistEntries: PropTypes.arrayOf(PropTypes.shape({
    categories: PropTypes.array.isRequired,
    word: PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  })).isRequired,
  wordlistId: PropTypes.string.isRequired
};
