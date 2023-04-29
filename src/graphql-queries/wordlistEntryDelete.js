import { gql } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments';

export const WORDLIST_ENTRY_DELETE = gql`
  mutation WordlistEntryDelete($id: ID!) {
    authToken
    wordlistEntryDelete(id: $id) {
      wordlistEntry {
        ...WordlistEntryFields
      }
    }
  }
  ${WORDLIST_ENTRY}
`;
