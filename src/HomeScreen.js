import { Loading } from './Loading';
import { gql, useQuery } from '@apollo/client';
import { Text, View } from 'react-native';

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
        Wordlist id: {data.myWordlist.id}
      </Text>
      {data.myWordlist.entries.map(({ word }) => {
        <Text id={word.id}>{word.text}</Text>;
      })}
    </>
  );
};
