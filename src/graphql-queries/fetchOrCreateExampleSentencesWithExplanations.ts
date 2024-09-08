import { gql } from '@apollo/client';

export const FETCH_OR_CREATE_EXAMPLE_SENTENCES_WITH_EXPLANATIONS = gql(`
  mutation FetchOrCreateExampleSentencesWithExplanations(
    $level: Level!
    $nativeLanguage: NativeLanguage
    $wordId: ID!
  ) {
    fetchOrCreateExampleSentences(level: $level, nativeLanguage: $nativeLanguage, wordId: $wordId) {
      exampleSentences {
        content
        createdAt
        explanation {
          content
          createdAt
          exampleSentenceId
          id
          language
          updatedAt
        }
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
