import { gql } from '@apollo/client';

export const FETCH_OR_CREATE_EXAMPLE_SENTENCES = gql(`
  mutation FetchOrCreateExampleSentences(
    $level: Level!
    $nativeLanguage: NativeLanguage
    $wordId: ID!
  ) {
    fetchOrCreateExampleSentences(level: $level, nativeLanguage: $nativeLanguage, wordId: $wordId) {
      exampleSentences {
        content
        createdAt
        form
        id
        level
        updatedAt
        word {
          createdAt
          id
          text
        }
      }
    }
  }
`);
