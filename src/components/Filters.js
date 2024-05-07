import { Text } from 'react-native-paper';
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

const useWordlistEntries = entries => {
  if (!entries) return null;
  const wordlistEntriesCategories = entries?.map(({ categories }) => {
    return categories.map(({ id, name }) => ({ id, name }));
  });

  const uniqueCategories = [
    ...new Set(wordlistEntriesCategories.flat().map(({ name }) => name))
  ];

  return uniqueCategories;
};

export const Filters = () => {
  const { data } = useQuery(MY_WORDLIST_CATEGORIES);
  const categories = useWordlistEntries(data?.myWordlist?.entries);
  if (!categories) return null;
  return (
    <View>
      {
        categories.map(name => {
          return (
            <Text key={name}>{name}</Text>
          );
        })
      }
    </View>
  );
};
