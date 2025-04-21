import { calculateLongestWordLength } from '../utils';
import { DeleteConfirm } from './DeleteConfirm';
import { MyWordlist } from '../__generated__/graphql';
import { Text } from 'react-native-paper';
import { WordlistEntry } from './WordlistEntry';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { QueryResult, Reference, StoreObject, useMutation, useQuery } from '@apollo/client';
import { ScrollView, View } from 'react-native';
import { useAsyncStorage, useFilters } from '../hooks';
import { useMemo, useState } from 'react';

export const Wordlist = () => {
  const currentAuthToken = useAsyncStorage();
  const { data }: QueryResult<{ myWordlist: MyWordlist }> = useQuery(MY_WORDLIST);
  // change useFilters to return entries?
  const { anyFiltersApplied, myWordlist } = useFilters(data);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wordlistEntryIdToDelete, setWordlistEntryIdToDelete] = useState<string | null>();
  const [wordlistEntryDelete] = useMutation(WORDLIST_ENTRY_DELETE, {
    optimisticResponse: () => ({
      authToken: currentAuthToken,
      wordlistEntryDelete: {
        wordlistEntry: {
          ...data?.myWordlist?.entries?.find(({ id }) => id === wordlistEntryIdToDelete)
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
          entries(existingEntryRefs: readonly (Reference | StoreObject)[], { readField }) {
            return existingEntryRefs.filter(entryRef => id !== readField('id', entryRef));
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistId })
      });
    }
  });

  const longestWordLength = useMemo(() => {
    const entries = myWordlist?.entries || [];
    return calculateLongestWordLength(entries);
  }, [myWordlist?.entries]);

  const entries = myWordlist?.entries || [];
  const wordFlexBasis = longestWordLength * 10;

  return (
    <ScrollView>
      {anyFiltersApplied && !entries.length ? (
        <Text style={{ marginTop: 16, textAlign: 'center' }}>
          You might want to adjust your filters :-)
        </Text>
      ) : (
        <View style={{ marginBottom: 73 }}>
          {entries.map(({ categories, id, word: { text }, wordId }) => (
            <WordlistEntry
              {...{
                categories,
                id,
                setShowDeleteConfirm,
                setWordlistEntryIdToDelete,
                text,
                wordFlexBasis,
                wordId
              }}
              key={id}
            />
          ))}
        </View>
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
