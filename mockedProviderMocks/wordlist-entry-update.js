import { GraphQLError } from 'graphql';
import { WORDLIST_ENTRY_UPDATE } from '../src/graphql-queries';

export const wordlistEntryUpdate = (
  requestCategories,
  responseCategories,
  requestWord,
  responseWord,
  error
) => ({
  request: {
    query: WORDLIST_ENTRY_UPDATE,
    variables: {
      id: 'dd284553-a78c-447f-baa3-832515e506d6',
      wordlistEntryInput: {
        categories: requestCategories,
        word: requestWord
      }
    }
  },
  result: error ? { data: {}, errors: [new GraphQLError('Error!')]} : {
    data: {
      authToken: 'auth-token-from-query-response',
      wordlistEntryUpdate: {
        __typename: 'WordlistEntryUpdatePayload',
        wordlistEntry: {
          __typename: 'WordlistEntry',
          categories: responseCategories,
          createdAt: '2023-11-25T15:41:35Z',
          id: 'dd284553-a78c-447f-baa3-832515e506d6',
          word: responseWord || {
            __typename: 'Word',
            createdAt: '2023-10-29T19:11:14Z',
            id: '4ecf7f86-c394-4a66-8152-1100af8a6cc7',
            text: 'phone'
          },
          wordId: '4ecf7f86-c394-4a66-8152-1100af8a6cc7',
          wordlistId: 'de728808-3df2-4dfc-adf9-5981ee5f795a'
        }
      }
    }
  }
});
