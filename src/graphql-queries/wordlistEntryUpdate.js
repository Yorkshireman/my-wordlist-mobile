import { gql } from '@apollo/client';

export const WORDLIST_ENTRY_UPDATE = gql`
  mutation UpdateWordlistEntry($id: ID!, $wordlistEntryInput: WordlistEntryInput!) {
    authToken
    wordlistEntryUpdate(id: $id, wordlistEntryInput: $wordlistEntryInput) {
      wordlistEntry {
        id
        categories {
          id
          name
        }
      }
    }
  }
`;
