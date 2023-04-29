import { gql } from '@apollo/client';

export const WORDLIST_ENTRY_CREATE = gql`
  mutation WordlistEntryCreate($word: String, $wordId: ID) {
    authToken
    wordlistEntryCreate(word: $word, wordId: $wordId) {
      wordlistEntry {
        categories {
          id
          name
        }
        id
        createdAt
        wordlistId
        wordId
        word {
          id
          text
          createdAt
        }
      }
    }
  }
`;
