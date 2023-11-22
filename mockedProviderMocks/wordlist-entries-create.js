import { WORDLIST_ENTRIES_CREATE } from '../src/graphql-queries';

export const wordlistEntriesCreateQueryMock = {
  request: {
    query: WORDLIST_ENTRIES_CREATE,
    variables: {
      wordlistEntries: [
        {
          categories: [],
          word: {
            text: 'chair'.trim()
          }
        }
      ]
    }
  },
  result: {
    data: {
      authToken: 'auth-token-from-query-response',
      wordlistEntriesCreate: {
        __typename: 'WordlistEntriesCreatePayload',
        wordlistEntries: [
          {
            __typename: 'WordlistEntry',
            categories: [],
            createdAt: '2023-11-22T20:38:41Z',
            id: '2e5737bc-89ca-4361-9b1b-909b2fa674af',
            word: {
              __typename: 'Word',
              createdAt: '2023-06-25T16:44:28Z',
              id: '443c7614-1f44-4792-b3a8-985a09379ebd',
              text: 'chair'
            },
            wordId: '443c7614-1f44-4792-b3a8-985a09379ebd',
            wordlistId: 'de728808-3df2-4dfc-adf9-5981ee5f795a'
          }
        ]
      }
    }
  }
};
