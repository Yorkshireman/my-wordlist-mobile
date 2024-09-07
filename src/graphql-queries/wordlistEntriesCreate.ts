import { gql } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';

export const WORDLIST_ENTRIES_CREATE = gql`
  mutation WordlistEntriesCreate($wordlistEntries: [WordlistEntryInput!]!) {
    authToken
    wordlistEntriesCreate(wordlistEntries: $wordlistEntries) {
      wordlistEntries {
        ...WordlistEntryFields
      }
    }
  }
  ${WORDLIST_ENTRY}
`;
