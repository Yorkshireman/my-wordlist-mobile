import { gql, useApolloClient } from '@apollo/client';

export const useWordlistEntryId = (id: string) => {
  const client = useApolloClient();
  return client.readFragment({
    fragment: gql`
      fragment MyWordlistEntry on WordlistEntry {
        categories {
          id
          name
        }
        createdAt
        id
        word {
          createdAt
          id
          text
        }
        wordId
        wordlistId
      }
    `,
    id: `WordlistEntry:${id}`
  });
};
