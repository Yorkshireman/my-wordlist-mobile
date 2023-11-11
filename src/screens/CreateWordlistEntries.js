import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useAuthToken } from '../hooks';
import { useMutation } from '@apollo/client';
import { WORDLIST_ENTRIES_CREATE } from '../graphql-queries';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { parseCategories, storeAuthToken } from '../utils';
import { useAsyncStorage, useInputRef, useWordText } from '../hooks';
import { useRef, useState } from 'react';

const buildOptimisticResponse = ({ currentAuthToken, wordlistEntries }) => {
  return {
    authToken: currentAuthToken,
    wordlistEntriesCreate: {
      __typename: 'WordlistEntriesCreatePayload',
      wordlistEntries: wordlistEntries.map(({ categories, wordlistId, wordText }) => {
        return {
          __typename: 'WordlistEntry',
          categories: categories.map(cat => ({ id: `${cat.name}-category-temp-id`, name: cat.name })),
          createdAt: 'temp-createdAt',
          id: `${wordText}-temp-id`,
          word: {
            __typename: 'Word',
            createdAt: 'temp-createdAt',
            id: 'temp-id',
            text: wordText.trim()
          },
          wordId: 'temp-wordId',
          wordlistId
        };
      })
    }
  };
};

export const CreateWordlistEntries = ({ navigation }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const { data } = useAuthToken(navigation);
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);
  const [wordText, setWordText] = useState('');
  useWordText(wordText, setDisabled);

  const [wordlistEntriesCreate] = useMutation(WORDLIST_ENTRIES_CREATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    },
    optimisticResponse: () => {
      const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
      const wordlistEntries = [{ categories, wordText, wordlistId: id }];
      return buildOptimisticResponse({ currentAuthToken, wordlistEntries });
    },
    update(cache, { data: { wordlistEntriesCreate: { wordlistEntries } } }) {
      cache.modify({
        fields: {
          entries(existingEntryRefs = []) {
            const newEntryRefs = wordlistEntries.map(wordlistEntry => {
              return cache.writeFragment({
                data: wordlistEntry,
                fragment: WORDLIST_ENTRY
              });
            });

            return [...newEntryRefs, ...existingEntryRefs];
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id })
      });
    }
  });

  const onSubmit = () => {
    const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    wordlistEntriesCreate({
      variables: {
        wordlistEntries: [
          {
            categories,
            word: {
              text: wordText.trim()
            }
          }
        ]
      }
    });

    setWordText('');
    // setModalVisible(false);
  };

  if (!data) return null;

  const { myWordlist: { id } } = data;

  return (
    <>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => setWordText(text)}
        ref={textInputRef}
        textTransform='lowercase'
        value={wordText}
      />
      <TextInput
        label='categories (optional)'
        mode='outlined'
        onChangeText={text => setUnparsedCategoriesText(text)}
        textTransform='lowercase'
        value={unparsedCategoriesText}
      />
      <HelperText style={styles.categoriesHelperText} variant='bodySmall'>
        <IconButton icon='information-outline' size={16} style={styles.categoriesHelperText.icon} />
        <Text style={styles.categoriesHelperText.text}>separate categories with a comma</Text>
      </HelperText>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={disabled}
        icon='send'
        mode='contained'
        onPress={onSubmit}
      >
          Add
      </Button>
    </>
  );
};

CreateWordlistEntries.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  categoriesHelperText: {
    bottom: 12,
    icon: {
      left: 0,
      margin: 0,
      position: 'absolute',
      top: -4
    },
    position: 'relative',
    text: {
      marginLeft: 15
    }
  }
});
