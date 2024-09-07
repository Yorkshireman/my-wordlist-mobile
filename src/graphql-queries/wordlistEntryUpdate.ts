import { gql } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';

export const WORDLIST_ENTRY_UPDATE = gql`
  mutation WordlistEntryUpdate($id: ID!, $wordlistEntryInput: WordlistEntryInput!) {
    authToken
    wordlistEntryUpdate(id: $id, wordlistEntryInput: $wordlistEntryInput) {
      wordlistEntry {
        ...WordlistEntryFields
      }
    }
  }
  ${WORDLIST_ENTRY}
`;
