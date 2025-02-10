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
    updatedAt
    wordId
    wordlistId
    word {
      createdAt
      id
      text
    }
  }
`;
