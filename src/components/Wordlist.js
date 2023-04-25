import { Loading } from './Loading';
import { MY_WORDLIST } from '../graphql-queries';
import { WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { DataTable, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';

export const Wordlist = () => {
  const { data } = useQuery(MY_WORDLIST);
  const [wordlistEntryDelete, { loading: deleteLoading }] = useMutation(WORDLIST_ENTRY_DELETE, {
    update(cache, { data: { wordlistEntryDelete: { wordlistEntry: { id, wordlistId } } } }) {
      cache.modify({
        fields: {
          entries(existingEntryRefs, { readField }) {
            return existingEntryRefs.filter(
              entryRef => id !== readField('id', entryRef)
            );
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistId})
      });
    }
  });

  return (
    <DataTable id={data.myWordlist.id}>
      {data.myWordlist.entries.map(({ id, word: { text } }) => {
        return (
          <DataTable.Row key={id}>
            <DataTable.Cell>{text}</DataTable.Cell>
            <View style={styles.delete}>
              {/* TODO: cure movement shift in transition */}
              {deleteLoading ?
                <Loading size='small' /> :
                <IconButton
                  icon='trash-can-outline'
                  onPress={() => wordlistEntryDelete({ variables: { id }})}
                  size={16}
                />}
            </View>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  delete: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
