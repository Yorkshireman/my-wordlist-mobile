import { gql } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments';

export const WORDLIST_ENTRY_CREATE = gql`
  mutation WordlistEntryCreate($word: String, $wordId: ID) {
    authToken
    wordlistEntryCreate(word: $word, wordId: $wordId) {
      wordlistEntry {
        ...WordlistEntryFields
      }
    }
  }
  ${WORDLIST_ENTRY}
`;
