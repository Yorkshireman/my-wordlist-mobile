import { gql } from '@apollo/client';

export const WORDLIST_ENTRY = gql`
  fragment WordlistEntryFields on WordlistEntry {
    categories {
      createdAt
      id
      name
    }
    createdAt
    id
    wordId
    wordlistId
    word {
      createdAt
      id
      text
    }
  }
`;
