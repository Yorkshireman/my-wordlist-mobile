import { Text } from 'react-native-paper';
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

const useWordlistEntries = entries => {
  if (!entries) return null;
  const wordlistEntriesCategories = entries?.map(({ categories }) => {
    return categories.map(({ id, name }) => ({ id, name }));
  }).flat();

  const uniqueCategories = wordlistEntriesCategories.reduce((acc, category) => {
    if (acc.find(({ id }) => id === category.id)) return acc;
    return [ ...acc, category ];
  }, [wordlistEntriesCategories[0]]);

  return uniqueCategories;
};

export const Filters = () => {
  const { data } = useQuery(MY_WORDLIST_CATEGORIES);
  const categories = useWordlistEntries(data?.myWordlist?.entries);
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
