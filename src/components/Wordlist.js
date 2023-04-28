import { AddCategories } from './AddCategories';
import { DeleteConfirm } from './DeleteConfirm';
import { useState } from 'react';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { StyleSheet, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';

export const Wordlist = () => {
  const { colors } = useTheme();
  const { data } = useQuery(MY_WORDLIST);
  const [id, setId] = useState();
  const [showAddCategories, setShowAddCategories] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [word, setWord] = useState('');
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
          <View key={id} style={styles.entry}>
            <View style={styles.word}>
              <Text>{text}</Text>
            </View>
            <View style={styles.addCategories.wrapper}>
              <IconButton
                icon='plus-circle-outline'
                onPress={() => {
                  setId(id);
                  setWord(text);
                  setShowAddCategories(true);
                }}
                size={16}
                style={styles.addCategories.icon}
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
      <AddCategories
        id={id}
        onDismiss={() => setShowAddCategories(false)}
        setVisible={setShowAddCategories}
        visible={showAddCategories}
        word={word}
      />
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

const styles = StyleSheet.create({
  addCategories: {
    icon: {
      alignItems: 'flex-end',
      margin: 0
    },
    wrapper: {
      columnGap: 2,
      flexDirection: 'row'
    }
  },
  entry: {
    alignSelf: 'flex-start',
    columnGap: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  word: {
    flexBasis: 100,
    justifyContent: 'center'
  }
});
