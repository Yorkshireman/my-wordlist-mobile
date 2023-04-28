import { DeleteConfirm } from './DeleteConfirm';
import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { useMutation, useQuery } from '@apollo/client';

export const Wordlist = () => {
  const { data } = useQuery(MY_WORDLIST);
  const { colors } = useTheme();
  const [id, setId] = useState();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wordlistEntryDelete] = useMutation(WORDLIST_ENTRY_DELETE, {
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
    <View>
      {data.myWordlist.entries.map(({ id, word: { text } }) => {
        return (
          <View key={id} style={{ alignSelf: 'flex-start', columnGap: 5, flexDirection: 'row', flexWrap: 'nowrap' }}>
            <View style={{ flexBasis: 100, justifyContent: 'center' }}>
              <Text>{text}</Text>
            </View>
            <View style={{ columnGap: 2, flexDirection: 'row' }}>
              <IconButton
                icon='plus-circle-outline'
                onPress={() => console.log('plus pressed')}
                size={16}
                style={{ alignItems: 'flex-end', margin: 0 }}
              />
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ color: colors.secondary, textAlign: 'center' }}>Categories</Text>
              </View>
            </View>
            <View>
              <IconButton
                icon='trash-can-outline'
                onPress={() => {
                  setId(id);
                  setShowDeleteConfirm(true);
                }}
                size={16}
                style={{ margin: 0 }}
              />
            </View>
          </View>
        );
      })}
      <DeleteConfirm
        confirm={() => {
          setShowDeleteConfirm(false);
          wordlistEntryDelete({ variables: { id }});
        }}
        onDismiss={() => setShowDeleteConfirm(false)}
        visible={showDeleteConfirm}
      />
    </View>
  );
};
