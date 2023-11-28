import { WORDLIST_ENTRY_UPDATE } from '../src/graphql-queries';

export const wordlistEntryUpdate = {
  request: {
    query: WORDLIST_ENTRY_UPDATE,
    variables: {
      id: 'dd284553-a78c-447f-baa3-832515e506d6',
      wordlistEntryInput: {
        categories: [
          {
            __typename: 'Category',
            id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
            name: 'noun'
          }
        ]
      }
    }
  },
  result: {
    data: {
      authToken: 'auth-token-from-query-response',
      wordlistEntryUpdate: {
        __typename: 'WordlistEntryUpdatePayload',
        wordlistEntry: {
          __typename: 'WordlistEntry',
          categories: [
            {
              __typename: 'Category',
              id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
              name: 'noun'
            }
          ],
          createdAt: '2023-11-25T15:41:35Z',
          id: 'dd284553-a78c-447f-baa3-832515e506d6',
          word: {
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
};
