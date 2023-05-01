import { AddCategories } from './AddCategories';
import { DeleteConfirm } from './DeleteConfirm';
import { useState } from 'react';
import { Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { StyleSheet, View } from 'react-native';
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

  return (
    <View>
      {data.myWordlist.entries.map(({ categories, id, word: { text } }) => {
        return (
          <View key={id} style={{ ...styles.entry, borderBottomColor: colors.secondaryContainer }}>
            <View style={styles.word}>
              <Text>{text}</Text>
            </View>
            <View style={styles.addCategories.wrapper}>
              <IconButton
                icon='plus-circle-outline'
                onPress={() => {
                  setId(id);
                  setShowAddCategories(true);
                }}
                size={16}
                style={styles.addCategories.icon}
              />
              <View style={{ justifyContent: 'center' }}>
                {categories.length ? (categories.map(({ id, name}) => {
                  return <Chip compact key={id} style={{ backgroundColor: colors.primary }} textStyle={{ color: 'white' }}>{name}</Chip>;
                })) : <Text style={{ color: colors.secondary, textAlign: 'center' }}>Categories</Text>}
              </View>
            </View>
            <View style={{ backgroundColor: 'yellow', justifyContent: 'center' }}>
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
      width: 15
    },
    wrapper: {
      backgroundColor: 'green',
      columnGap: 2,
      flex: 1,
      flexDirection: 'row'
    }
  },
  entry: {
    backgroundColor: 'grey',
    borderBottomWidth: 1,
    columnGap: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  word: {
    backgroundColor: 'red',
    flexBasis: 100,
    justifyContent: 'center'
  }
});
