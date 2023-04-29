import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEW_WORDLIST_ENTRY } from '../fragments';
import PropTypes from 'prop-types';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { useWordText } from '../hooks';
import { Button, TextInput } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_CREATE } from '../graphql-queries';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

const sanitiseWordText = text => text.trim();

const useAsyncStorage = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const getCurrentAuthToken = async () => {
      return await AsyncStorage.getItem('myWordlistAuthToken');
    };

    const setAuthToken = async () => {
      const currentAuthToken = await getCurrentAuthToken();
      setToken(currentAuthToken);
    };

    setAuthToken();
  }, []);

  return token;
};

const buildOptimisticResponse = ({ currentAuthToken, wordText, wordlistId }) => {
  return {
    authToken: currentAuthToken,
    wordlistEntryCreate: {
      __typename: 'WordlistEntryCreatePayload',
      wordlistEntry: {
        __typename: 'WordlistEntry',
        categories: [],
        createdAt: 'temp-createdAt',
        id: 'temp-id',
        word: {
          __typename: 'Word',
          createdAt: 'temp-createdAt',
          id: 'temp-id',
          text: sanitiseWordText(wordText)
        },
        wordId: 'temp-wordId',
        wordlistId
      }
    }
  };
};

export const CreateWordlistEntryForm = ({ setModalVisible, wordlistId }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const [wordText, setWordText] = useState('');
  useWordText(wordText, setDisabled);
  const [wordlistEntryCreate] = useMutation(WORDLIST_ENTRY_CREATE, {
    optimisticResponse: buildOptimisticResponse({ currentAuthToken, wordText, wordlistId }),
    update(cache, { data: { authToken, wordlistEntryCreate: { wordlistEntry } } }) {
      storeAuthToken(authToken);
      const currentData = cache.readQuery({
        query: MY_WORDLIST
      });

      const updatedMyWordlist = {
        ...currentData.myWordlist,
        entries: [
          wordlistEntry,
          ...currentData.myWordlist.entries
        ]
      };

      cache.writeQuery({
        data: {
          authToken,
          myWordlist: updatedMyWordlist
        },
        query: MY_WORDLIST
      });
    }
  });

  const onSubmit = () => {
    wordlistEntryCreate({ variables: { word: sanitiseWordText(wordText) }});
    setWordText('');
    setModalVisible(false);
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
  setModalVisible: PropTypes.func.isRequired,
  wordlistId: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16
  }
});
