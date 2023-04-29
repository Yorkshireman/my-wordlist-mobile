import { gql, useApolloClient } from '@apollo/client';

export const useId = id => {
  const client = useApolloClient();
  const wordlistEntry = client.readFragment({
    fragment: gql`
      fragment MyWordlistEntry on WordlistEntry {
        categories {
          name
        }
        word {
          text
        }
      }
    `,
    id: `WordlistEntry:${id}`
  });

  const existingCategories = wordlistEntry.categories.map(({ name }) => ({ name }));
  const wordText = wordlistEntry.word.text;
  return { existingCategories, wordText };
};
