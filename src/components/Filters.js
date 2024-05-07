import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { Text } from 'react-native-paper';
import { useMemo } from 'react';
import { View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

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
    <View>
      <Text>Categories to include:</Text>
      {
        categories.map(({ id, name }) => {
          return (
            <Text key={id}>{name}</Text>
          );
        })
      }
    </View>
  );
};
