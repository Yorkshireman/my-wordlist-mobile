import { calculateLongestWordLength } from '../utils';
import { Categories } from './Categories';
import { DeleteConfirm } from './DeleteConfirm';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Menu, Text, useTheme } from 'react-native-paper';
import { MY_WORDLIST, WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { ScrollView, StyleSheet, View } from 'react-native';
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
  const navigation = useNavigation();
  const {
    colors: { secondaryContainer }
  } = useTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wordlistEntryMenuVisible, setWordlistEntryMenuVisible] = useState(null);
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
        entries.map(({ categories, id, word: { text } }) => {
          return (
            <View
              aria-label='wordlist-entry'
              key={id}
              style={{ ...styles.entry, borderBottomColor: secondaryContainer }}
              testID={id}
            >
              <View style={{ ...styles.word, flexBasis: wordFlexBasis }}>
                <Text variant={'bodyLarge'}>{text}</Text>
              </View>
              <View style={styles.addCategories.wrapper}>
                <Categories categories={categories} />
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 'auto' }}>
                <Menu
                  anchor={
                    <IconButton
                      icon='dots-vertical'
                      onPress={() => {
                        setWordlistEntryMenuVisible(id);
                      }}
                      size={24}
                      style={{ margin: 0 }}
                      testID={`wordlist-entry-menu-${id}`}
                    />
                  }
                  onDismiss={() => setWordlistEntryMenuVisible(null)}
                  visible={wordlistEntryMenuVisible === id}
                >
                  <Menu.Item
                    leadingIcon='note-edit-outline'
                    onPress={() => {
                      setWordlistEntryMenuVisible(null);
                      navigation.navigate('EditWordlistEntry', { id });
                    }}
                    title='Edit'
                  />
                  <Menu.Item
                    leadingIcon='trash-can-outline'
                    onPress={() => {
                      setWordlistEntryIdToDelete(id);
                      setWordlistEntryMenuVisible(null);
                      setShowDeleteConfirm(true);
                    }}
                    title='Delete'
                  />
                </Menu>
              </View>
            </View>
          );
        })
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
