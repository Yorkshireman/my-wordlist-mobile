import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { useMemo } from 'react';
import { Button, Text } from 'react-native-paper';
import { gql, useQuery } from '@apollo/client';
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

  if (!categories) return null;

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ marginBottom: 10 }} variant='titleMedium'>Select categories to include:</Text>
      <View style={styles.categories}>
        {
          categories.map(({ id, name }) => {
            return (
              <Button compact disabled key={id} mode='contained-tonal'>{name}</Button>
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
