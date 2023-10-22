import { Button } from 'react-native-paper';
import { parseCategories } from '../../utils';
import PropTypes from 'prop-types';
import { storeAuthToken } from '../../utils';
import { useAsyncStorage } from '../../hooks';
import { useMutation } from '@apollo/client';
import { WORDLIST_ENTRIES_CREATE } from '../../graphql-queries';
import { WORDLIST_ENTRY } from '../../fragments/wordlistEntry';
import { WordlistEntry } from './WordlistEntry';
import { useEffect, useState } from 'react';

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

export const CreateWordlistEntriesForm = ({ setModalVisible, wordlistId }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const [wordlistEntries, setWordlistEntries] = useState([
    {
      categories: [],
      word: {
        text: ''
      },
      wordlistId
    }
  ]);

  // const [wordlistEntriesCreate] = useMutation(WORDLIST_ENTRIES_CREATE, {
  //   onCompleted: ({ authToken }) => {
  //     storeAuthToken(authToken);
  //   },
  //   optimisticResponse: () => {
  //     const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
  //     const wordlistEntries = [{ categories, wordText, wordlistId }];
  //     return buildOptimisticResponse({ currentAuthToken, wordlistEntries });
  //   },
  //   update(cache, { data: { wordlistEntriesCreate: { wordlistEntries } } }) {
  //     cache.modify({
  //       fields: {
  //         entries(existingEntryRefs = []) {
  //           const newEntryRefs = wordlistEntries.map(wordlistEntry => {
  //             return cache.writeFragment({
  //               data: wordlistEntry,
  //               fragment: WORDLIST_ENTRY
  //             });
  //           });

  //           return [...newEntryRefs, ...existingEntryRefs];
  //         }
  //       },
  //       id: cache.identify({ __typename: 'MyWordlist', id: wordlistId })
  //     });
  //   }
  // });

  useEffect(() => {
    console.log(JSON.stringify(wordlistEntries, null, 2));
    if (wordlistEntries.find(wordlistEntry => wordlistEntry?.word?.text?.length)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, wordlistEntries]);

  // const onSubmit = () => {
  //   wordlistEntriesCreate({
  //     variables: {
  //       wordlistEntries
  //     }
  //   });

  //   // setWordText('');
  //   setModalVisible(false);
  // };

  return (
    <>
      {wordlistEntries.map(({ word }, i) =>
        <WordlistEntry index={i} key={i} setWordlistEntries={setWordlistEntries} word={word} />
      )}
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={disabled}
        icon='send'
        mode='contained'
        // onPress={onSubmit}
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
