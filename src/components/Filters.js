import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { Text } from 'react-native-paper';
import { useMemo } from 'react';
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
      <Text>Categories to include:</Text>
      <View style={styles.categories}>
        {
          categories.map(({ id, name }) => {
            return (
              <Text key={id}>{name}</Text>
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
    gap: 2
  }
});
