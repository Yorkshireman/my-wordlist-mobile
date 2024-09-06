import { calculateLongestWordLength } from '../utils';
import { DeleteConfirm } from './DeleteConfirm';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { WordlistEntry } from './WordlistEntry';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { useAsyncStorage, useFilters } from '../hooks';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

export const Wordlist = () => {
  const currentAuthToken = useAsyncStorage();
  const { data } = useQuery(MY_WORDLIST);
  const {
    anyFiltersApplied,
    myWordlist: { entries }
  } = useFilters(data);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wordlistEntryIdToDelete, setWordlistEntryIdToDelete] = useState();
  const [wordlistEntryDelete] = useMutation(WORDLIST_ENTRY_DELETE, {
    optimisticResponse: () => ({
      authToken: currentAuthToken,
      wordlistEntryDelete: {
        wordlistEntry: {
          ...data.myWordlist.entries.find(({ id }) => id === wordlistEntryIdToDelete)
        }
      }
    }),
    update(
      cache,
      {
        data: {
          wordlistEntryDelete: {
            wordlistEntry: { id, wordlistId }
          }
        }
      }
    ) {
      cache.modify({
        fields: {
          entries(existingEntryRefs, { readField }) {
            return existingEntryRefs.filter(entryRef => id !== readField('id', entryRef));
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistId })
      });
    }
  });

  const longestWordLength = useMemo(() => {
    return calculateLongestWordLength(entries);
  }, [entries]);

  const wordFlexBasis = longestWordLength * 10;

  return (
    <ScrollView>
      {anyFiltersApplied && !entries.length ? (
        <Text style={{ marginTop: 16, textAlign: 'center' }}>
          You might want to adjust your filters :-)
        </Text>
      ) : (
        entries.map(({ categories, id, word: { text } }) => (
          <WordlistEntry
            {...{
              categories,
              id,
              setShowDeleteConfirm,
              setWordlistEntryIdToDelete,
              text,
              wordFlexBasis
            }}
            key={id}
          />
        ))
      )}
      <DeleteConfirm
        confirm={() => {
          setShowDeleteConfirm(false);
          wordlistEntryDelete({ variables: { id: wordlistEntryIdToDelete } });
        }}
        onDismiss={() => {
          setShowDeleteConfirm(false);
          setWordlistEntryIdToDelete(null);
        }}
        visible={showDeleteConfirm}
      />
    </ScrollView>
  );
};
