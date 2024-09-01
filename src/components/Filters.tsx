import { LinearGradient } from 'expo-linear-gradient';
import { MY_WORDLIST_CATEGORIES } from '../graphql-queries';
import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { selectedCategoriesIdsVar } from '../reactiveVars';
import { useMemo } from 'react';
import { useUpdateCategoriesSelectedIdsVar } from '../hooks/useUpdateCategoriesSelectedIdsVar';
import { WordlistEntry } from '../__generated__/graphql';
import { Button, Text, useTheme } from 'react-native-paper';
import { QueryResult, useQuery, useReactiveVar } from '@apollo/client';
import { StyleSheet, View } from 'react-native';

export const Filters = () => {
  const { data }: QueryResult<{ myWordlist: { entries: WordlistEntry[] } }> =
    useQuery(MY_WORDLIST_CATEGORIES);

  const {
    colors: { inversePrimary, onSurfaceVariant, primary, secondaryContainer }
  } = useTheme();

  const selectedCategoriesIds = useReactiveVar(selectedCategoriesIdsVar);

  const entries = data?.myWordlist?.entries;

  const wordlistCategories = useMemo(
    () => (entries && parseUniqueCategories(entries)) || [],
    [entries]
  );

  useUpdateCategoriesSelectedIdsVar(wordlistCategories.map(({ id }) => id));

  if (!wordlistCategories) return null;

  const handleCategoryPress = (categoryId: string) => {
    const alreadySelected = selectedCategoriesIds.includes(categoryId);
    if (alreadySelected) {
      return selectedCategoriesIdsVar(selectedCategoriesIds.filter(id => id !== categoryId));
    }

    return selectedCategoriesIdsVar([...selectedCategoriesIds, categoryId]);
  };

  return (
    <View style={{ height: '100%', padding: 10 }} testID='filters-container'>
      <LinearGradient colors={[secondaryContainer, 'white']} style={styles.background} />
      <Text style={{ marginBottom: 10 }} variant='titleMedium'>
        Select categories to include:
      </Text>
      <View style={styles.categories}>
        {wordlistCategories.map(({ id, name }) => {
          return (
            <Button
              buttonColor={selectedCategoriesIds.includes(id) ? primary : inversePrimary}
              compact
              key={id}
              mode='contained'
              onPress={() => handleCategoryPress(id)}
              textColor={selectedCategoriesIds.includes(id) ? 'white' : onSurfaceVariant}
            >
              {name}
            </Button>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3
  }
});
