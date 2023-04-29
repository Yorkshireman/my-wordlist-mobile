import { gql } from '@apollo/client';

export const NEW_WORDLIST_ENTRY = gql`
  fragment NewWordlistEntry on WordlistEntry {
    categories {
      id
      name
    }
    createdAt
    id
    wordlistId
    word {
      createdAt
      id
      text
    }
  }
`;
