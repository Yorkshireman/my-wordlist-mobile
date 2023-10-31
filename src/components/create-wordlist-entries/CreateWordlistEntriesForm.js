import { deepCopy } from '../../utils';
import { emptyWordlistEntry } from '../../../constants';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-web';
import { unsanitisedWordlistEntriesVar } from '../../../reactive-vars';
import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { View } from 'react-native';
import { WordlistEntry } from './WordlistEntry';
import { Button, IconButton } from 'react-native-paper';
import { useAsyncStorage, useUnsanitisedWordlistEntries, useWordlistEntriesCreate } from '../../hooks';

export const CreateWordlistEntriesForm = ({ setModalVisible, wordlistId }) => {
  const [addWordlistEntryButtonIsEnabled, setAddWordlistEntryButtonIsEnabled] = useState(true);
  const currentAuthToken = useAsyncStorage();
  const [submitButtonIsEnabled, setSubmitButtonIsEnabled] = useState(true);
  const unsanitisedWordlistEntries = useReactiveVar(unsanitisedWordlistEntriesVar);
  const sanitisedWordlistEntries = useUnsanitisedWordlistEntries({ setAddWordlistEntryButtonIsEnabled, setSubmitButtonIsEnabled, unsanitisedWordlistEntries });
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
        <WordlistEntry index={i} key={i} word={word} />
      )}
      <IconButton
        disabled={!addWordlistEntryButtonIsEnabled}
        icon="camera"
        onPress={() => unsanitisedWordlistEntriesVar([...unsanitisedWordlistEntries, deepCopy(emptyWordlistEntry)])}
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
          disabled={!submitButtonIsEnabled}
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
  wordlistId: PropTypes.string.isRequired
};
