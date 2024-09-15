import { MY_WORDLIST } from '../graphql-queries';
import { parseUniqueCategories } from '../utils';
import sharedStyles from '../styles';
import { useAsyncStorage } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useWordlistEntryUpdate } from '../hooks';
import { AddCategoriesForm, EditWordForm } from '../components';
import { Button, Chip, Divider, IconButton, Text } from 'react-native-paper';
import { Category, MyWordlist, WordlistEntry } from '../__generated__/graphql';
import { EditWordlistEntryScreenProps, EditWordlistEntryScreenRouteParams } from '../../types';
import { QueryResult, useQuery } from '@apollo/client';
import { StyleSheet, View } from 'react-native';

const Categories = ({
  categories,
  deleteCategory
}: {
  categories: Category[];
  deleteCategory: (id: string) => void;
}) => {
  return (
    <View style={styles.categoryChipsWrapper}>
      {categories.map(({ id, name }) => {
        return (
          <Chip
            closeIconAccessibilityLabel={`delete-${name}-category`}
            compact
            key={id}
            onClose={() => deleteCategory(id)}
            style={styles.chip}
          >
            <Text variant='bodyLarge'>{name}</Text>
          </Chip>
        );
      })}
    </View>
  );
};

const Word = ({
  setEditWordFormVisible,
  text
}: {
  setEditWordFormVisible: (arg0: boolean) => void;
  text: string;
}) => {
  return (
    <View style={styles.wordWrapper}>
      <View style={{ justifyContent: 'center' }}>
        <Text variant={'titleLarge'}>{text}</Text>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <IconButton
          icon='note-edit-outline'
          onPress={() => setEditWordFormVisible(true)}
          size={22}
          style={{ margin: 0 }}
          testID='edit-word-button'
        />
      </View>
    </View>
  );
};

const OtherWordlistCategories = ({
  entries,
  entryCategories
}: {
  entries: WordlistEntry[];
  entryCategories: Category[];
}) => {
  const uniqueWordlistCategories = parseUniqueCategories(entries);

  const categories = uniqueWordlistCategories?.filter(
    ({ id }) => !entryCategories.some(cat => cat.id === id)
  );

  if (!categories) return null;

  return (
    <>
      <Divider style={{ marginBottom: 16 }} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        {categories.map(({ id, name }) => {
          return (
            <Chip
              compact
              key={id}
              mode='outlined'
              onPress={() => console.log('pressed')}
              style={{
                ...styles.chip,
                backgroundColor: 'rgba(0, 0, 0, 0)'
              }}
            >
              <Text variant='bodyLarge'>{name}</Text>
            </Chip>
          );
        })}
      </View>
    </>
  );
};

export const EditWordlistEntryScreen = ({
  navigation: { navigate }
}: EditWordlistEntryScreenProps) => {
  const currentAuthToken = useAsyncStorage();
  const [editWordFormVisible, setEditWordFormVisible] = useState(false);
  const { data }: QueryResult<{ myWordlist: MyWordlist }> = useQuery(MY_WORDLIST);

  const {
    params: { id }
  } = useRoute<EditWordlistEntryScreenRouteParams>();

  const wordlistEntryUpdate = useWordlistEntryUpdate();

  if (!data || !data.myWordlist) return null;
  // remove the ! once I've updated server schema to make entries non-nullable
  const entries = data.myWordlist.entries!;
  // On the Edit screen, we can assume that the entry exists
  const wordlistEntry = entries.find(entry => entry.id === id) as WordlistEntry;

  const {
    categories,
    word: { text }
  } = wordlistEntry;

  const deleteCategory = (selectedCategoryId: string) => {
    const categoriesMinusSelected = categories
      .filter(({ id }) => id !== selectedCategoryId)
      .map(cat => ({ __typename: 'Category' as const, ...cat }));

    const tempWordlistEntry = {
      ...wordlistEntry,
      categories: categoriesMinusSelected
    };

    wordlistEntryUpdate({
      optimisticResponse: {
        authToken: currentAuthToken,
        wordlistEntryUpdate: {
          __typename: 'WordlistEntryUpdatePayload',
          wordlistEntry: tempWordlistEntry
        }
      },
      variables: {
        id,
        wordlistEntryInput: {
          categories: categoriesMinusSelected
        }
      }
    });
  };

  return (
    <View style={{ ...sharedStyles.container, ...styles.wrapper }}>
      <Text style={styles.title}>Edit</Text>
      {editWordFormVisible ? (
        <Button
          compact
          mode='outlined'
          onPress={() => setEditWordFormVisible(false)}
          style={styles.cancel}
          textColor='#1E1A1D'
        >
          Cancel
        </Button>
      ) : (
        <Text onPress={() => navigate('Home')} style={styles.close}>
          Close
        </Text>
      )}
      {editWordFormVisible ? (
        <EditWordForm setEditWordFormVisible={setEditWordFormVisible} />
      ) : (
        <Word setEditWordFormVisible={setEditWordFormVisible} text={text} />
      )}
      <AddCategoriesForm />
      <Categories categories={categories} deleteCategory={deleteCategory} />
      <OtherWordlistCategories entries={entries} entryCategories={categories} />
    </View>
  );
};

const styles = StyleSheet.create({
  cancel: {
    position: 'absolute',
    right: 20,
    top: 9
  },
  categoryChipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 16
  },
  chip: {
    marginRight: 2.5
  },
  close: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    top: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center'
  },
  wordWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12
  },
  wrapper: {
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 20
  }
});
