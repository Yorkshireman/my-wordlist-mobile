import { gql } from '@apollo/client';

export const NEW_WORDLIST_ENTRY = gql`
  fragment NewWordlistEntry on WordlistEntry {
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
