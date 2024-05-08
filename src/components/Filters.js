import { categoriesToIncludeVar } from '../reactiveVars';
import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { useMemo } from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
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
  const { colors: { onPrimary, primary } } = useTheme();

  if (!categories) return null;

  const handleCategoryPress = categoryId => {
    if (categoriesToInclude.includes(categoryId)) {
      return categoriesToIncludeVar(categoriesToInclude.filter(id => id !== categoryId));
    }

    return categoriesToIncludeVar([...categoriesToInclude, categoryId]);
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ marginBottom: 10 }} variant='titleMedium'>Select categories to include:</Text>
      <View style={styles.categories}>
        {
          categories.map(({ id, name }) => {
            return (
              <Button
                buttonColor={categoriesToInclude.includes(id) ? primary : 'rgb(211, 210, 211)'}
                compact
                key={id}
                mode='contained'
                onPress={() => handleCategoryPress(id)}
                textColor={categoriesToInclude.includes(id) ? onPrimary : 'rgb(142, 140, 142)'}
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
