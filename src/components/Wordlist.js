import { calculateLongestWordLength } from '../utils';
import { Categories } from './Categories';
import { categoriesSelectedVar } from '../reactiveVars';
import { DeleteConfirm } from './DeleteConfirm';
import { useAsyncStorage } from '../hooks';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';

const useFilters = data => {
  const categoriesSelected = useReactiveVar(categoriesSelectedVar);

  if (!categoriesSelected.length) return data;

  const filteredEntries = data.myWordlist.entries.filter(({ categories }) => {
    if (categoriesSelected.every(id => categories.map(({ id }) => id).includes(id))) return true;
    return false;
  });

  return {
    ...data,
    myWordlist: {
      ...data.myWordlist,
      entries: filteredEntries
    }
  };
};

export const Wordlist = () => {
  const currentAuthToken = useAsyncStorage();
  const { data } = useQuery(MY_WORDLIST);
  const filteredData = useFilters(data);
  const navigation = useNavigation();
  const { colors: { secondaryContainer } } = useTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wordlistEntryDelete] = useMutation(WORDLIST_ENTRY_DELETE, {
    optimisticResponse: () => ({
      authToken: currentAuthToken,
      wordlistEntryDelete: {
        wordlistEntry: {
          ...data.myWordlist.entries.find(({ id }) => id === wordlistEntryId)
        }
      }
    }),
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

  const [wordlistEntryId, setWordlistEntryId] = useState();

  const longestWordLength = useMemo(() => {
    return calculateLongestWordLength(filteredData.myWordlist.entries);
  }, [filteredData.myWordlist.entries]);

  const wordFlexBasis = longestWordLength * 10;

  return (
    <ScrollView>
      {filteredData.myWordlist.entries.map(({ categories, id, word: { text } }) => {
        return (
          <View key={id} style={{ ...styles.entry, borderBottomColor: secondaryContainer }}>
            <View style={{ ...styles.word, flexBasis: wordFlexBasis }}>
              <Text variant={'bodyLarge'}>{text}</Text>
            </View>
            <View style={styles.addCategories.wrapper}>
              <Categories categories={categories} />
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 'auto' }}>
              <IconButton
                icon='note-edit-outline'
                onPress={() => navigation.navigate('EditWordlistEntry', { id })}
                size={16}
                style={{ margin: 0 }}
                testID='edit-wordlist-entry-icon'
              />
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 'auto' }}>
              <IconButton
                icon='trash-can-outline'
                onPress={() => {
                  setWordlistEntryId(id);
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
          wordlistEntryDelete({ variables: { id: wordlistEntryId }});
        }}
        onDismiss={() => setShowDeleteConfirm(false)}
        visible={showDeleteConfirm}
      />
    </ScrollView>
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
