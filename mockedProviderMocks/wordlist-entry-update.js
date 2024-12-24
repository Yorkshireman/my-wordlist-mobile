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
      id: '45824606-8e65-4d94-93ab-851e751e10f1',
      wordlistEntryInput: {
        categories: requestCategories,
        word: requestWord
      }
    }
  },
  result: error
    ? { data: {}, errors: [new GraphQLError('Error!')] }
    : {
        data: {
          authToken: 'auth-token-from-query-response',
          wordlistEntryUpdate: {
            __typename: 'WordlistEntryUpdatePayload',
            wordlistEntry: {
              __typename: 'WordlistEntry',
              categories: responseCategories,
              createdAt: '2024-05-04T16:39:56Z',
              id: '45824606-8e65-4d94-93ab-851e751e10f1',
              word: responseWord || {
                __typename: 'Word',
                createdAt: '2023-10-29T19:11:14Z',
                id: '4ecf7f86-c394-4a66-8152-1100af8a6cc7',
                text: 'phone'
              },
              wordId: 'ed396911-e7d2-4f54-a31a-8172364b6ba6',
              wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf'
            }
          }
        }
      }
});
