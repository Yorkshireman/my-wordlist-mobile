import { gql } from '@apollo/client';

export const WORDLIST_ENTRY_DELETE = gql`
  mutation WordlistEntryDelete($id: ID!) {
    authToken
    wordlistEntryDelete(id: $id) {
      wordlistEntry {
        id
      }
    }
  }
`;
