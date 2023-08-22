import { gql } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';

export const WORDLIST_ENTRY_CREATE = gql`
  mutation WordlistEntryCreate($categories: [CategoryInput!], $word: String, $wordId: ID) {
    authToken
    wordlistEntryCreate(categories: $categories, word: $word, wordId: $wordId) {
      wordlistEntry {
        ...WordlistEntryFields
      }
    }
  }
  ${WORDLIST_ENTRY}
`;
