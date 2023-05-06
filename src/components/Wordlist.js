import { AddCategories } from './AddCategories';
import { calculateLongestWordLength } from '../utils';
import { Categories } from './Categories';
import { DeleteConfirm } from './DeleteConfirm';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { StyleSheet, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

export const Wordlist = () => {
  const { colors } = useTheme();
  const { data } = useQuery(MY_WORDLIST);
  const [id, setId] = useState();
  const [showAddCategories, setShowAddCategories] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wordlistEntryDelete] = useMutation(WORDLIST_ENTRY_DELETE, {
    // need to add optimisticResponse
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

  const longestWordLength = useMemo(() => {
    return calculateLongestWordLength(data.myWordlist.entries);
  }, [data.myWordlist.entries]);

  const wordFlexBasis = longestWordLength * 9;

  return (
    <View>
      {data.myWordlist.entries.map(({ categories, id, word: { text } }) => {
        return (
          <View key={id} style={{ ...styles.entry, borderBottomColor: colors.secondaryContainer }}>
            <View style={{ ...styles.word, flexBasis: wordFlexBasis }}>
              <Text variant={'bodyLarge'}>{text}</Text>
            </View>
            <View style={styles.addCategories.wrapper}>
              <IconButton
                icon='plus-circle-outline'
                onPress={() => {
                  setId(id);
                  setShowAddCategories(true);
                }}
                size={20}
                style={styles.addCategories.icon}
              />
              <Categories categories={categories} />
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 'auto' }}>
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
      {showAddCategories && <AddCategories
        id={id}
        onDismiss={() => setShowAddCategories(false)}
        setVisible={setShowAddCategories}
        visible={showAddCategories}
      />}
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
      height: '100%',
      margin: 0,
      marginRight: 3,
      width: 20
    },
    wrapper: {
      columnGap: 2,
      flex: 1,
      flexDirection: 'row'
    }
  },
  entry: {
    borderBottomWidth: 1,
    columnGap: 5,
    flexDirection: 'row',
    paddingBottom: 2,
    paddingTop: 2
  },
  word: {
    flexBasis: 100,
    justifyContent: 'center',
    maxWidth: 185
  }
});
