import { categoriesToIncludeVar } from '../reactiveVars';
import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { useMemo } from 'react';
import { Button, Text } from 'react-native-paper';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { StyleSheet, View } from 'react-native';

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
  const categoriesToInclude = useReactiveVar(categoriesToIncludeVar);

  if (!categories) return null;

  const handleCategoryPress = categoryId => {
    return categoriesToIncludeVar([...categoriesToInclude, categoryId]);
  };

  // const isAnIncludedCategory = categoryId => categoriesToInclude.includes(categoryId);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ marginBottom: 10 }} variant='titleMedium'>Select categories to include:</Text>
      <View style={styles.categories}>
        {
          categories.map(({ id, name }) => {
            return (
              <Button compact key={id} mode='contained' onPress={() => handleCategoryPress(id)}>{name}</Button>
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
