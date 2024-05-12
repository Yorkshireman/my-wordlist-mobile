import { categoriesSelectedVar } from '../reactiveVars';
import { MY_WORDLIST_CATEGORIES } from '../graphql-queries';
import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { useMemo } from 'react';
import { useUpdateCategoriesSelectedVar } from '../hooks/useUpdateCategoriesSelectedVar';
import { Button, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useQuery, useReactiveVar } from '@apollo/client';

export const Filters = () => {
  const categoriesSelected = useReactiveVar(categoriesSelectedVar);
  const { data: { myWordlist: { entries } = {} } = {} } = useQuery(MY_WORDLIST_CATEGORIES);
  const { colors: { onPrimary, primary } } = useTheme();
  const wordlistCategories = useMemo(() => parseUniqueCategories(entries), [entries]);
  useUpdateCategoriesSelectedVar(wordlistCategories);

  if (!wordlistCategories) return null;

  const handleCategoryPress = categoryId => {
    if (categoriesSelected.includes(categoryId)) {
      return categoriesSelectedVar(categoriesSelected.filter(id => id !== categoryId));
    }

    return categoriesSelectedVar([...categoriesSelected, categoryId]);
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ marginBottom: 10 }} variant='titleMedium'>Select categories to include:</Text>
      <View style={styles.categories}>
        {
          wordlistCategories.map(({ id, name }) => {
            return (
              <Button
                buttonColor={categoriesSelected.includes(id) ? primary : 'rgb(211, 210, 211)'}
                compact
                key={id}
                mode='contained'
                onPress={() => handleCategoryPress(id)}
                textColor={categoriesSelected.includes(id) ? onPrimary : 'rgb(142, 140, 142)'}
              >
                {name}
              </Button>
            );
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3
  }
});
