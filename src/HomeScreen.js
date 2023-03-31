import { Loading } from './Loading';
import { Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const MY_WORDLIST_QUERY = gql`
  query MyWordlist {
    myWordlist {
      id
      entries {
        word {
          id
          text
        }
      }
    }
  }
`;

export const HomeScreen = () => {
  const { data, loading } = useQuery(MY_WORDLIST_QUERY);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Text>
        MyWordlist
      </Text>
      {data.myWordlist.entries.map(({ word }) => (
        <Text key={word.id}>{word.text}</Text>
      ))}
    </>
  );
};
