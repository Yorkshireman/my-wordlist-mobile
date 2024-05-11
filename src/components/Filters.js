import { categoriesSelectedVar } from '../reactiveVars';
import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { Button, Text, useTheme } from 'react-native-paper';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { StyleSheet, View } from 'react-native';
import { useEffect, useMemo } from 'react';

const MY_WORDLIST_CATEGORIES = gql`
  query MyWordlist {
    myWordlist {
      entries {
        categories {
          id
          name
        }
      }
    }
  }
`;

export const Filters = () => {
  const { data: { myWordlist: { entries } = {} } = {} } = useQuery(MY_WORDLIST_CATEGORIES);
  const categories = useMemo(() => parseUniqueCategories(entries), [entries]);
  const categoriesSelected = useReactiveVar(categoriesSelectedVar);
  const { colors: { onPrimary, primary } } = useTheme();

  useEffect(() => {
    const isIncludedCategoryInWordlist = categoryId => {
      return categories.some(({ id }) => id === categoryId);
    };

    categoriesSelectedVar(categoriesSelected.filter(isIncludedCategoryInWordlist));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories) return null;

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
          categories.map(({ id, name }) => {
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
