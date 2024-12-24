import { WORDLIST_ENTRIES_CREATE } from '../src/graphql-queries';

export const wordlistEntriesCreateWithCategories = {
  request: {
    query: WORDLIST_ENTRIES_CREATE,
    variables: {
      wordlistEntries: [
        {
          categories: [
            {
              name: 'household'
            },
            {
              name: 'phrasal verb'
            }
          ],
          word: {
            text: 'chair'
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
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-04T14:46:00Z',
                id: 'f6c0fc6f-3b01-4059-9588-ccb2bda39d23',
                name: 'household'
              },
              {
                __typename: 'Category',
                createdAt: '2023-11-23T00:16:30Z',
                id: '34392873-31e2-4a57-8967-822a86eaca28',
                name: 'phrasal verb'
              }
            ],
            createdAt: '2023-11-23T00:16:30Z',
            id: 'e876ed91-9c98-4107-aa21-07d8bd27e91d',
            word: {
              __typename: 'Word',
              createdAt: '2023-06-25T16:44:28Z',
              id: '443c7614-1f44-4792-b3a8-985a09379ebd',
              text: 'chair'
            },
            wordId: '443c7614-1f44-4792-b3a8-985a09379ebd',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf'
          }
        ]
      }
    }
  }
};

export const wordlistEntriesCreateWithNoCategories = {
  request: {
    query: WORDLIST_ENTRIES_CREATE,
    variables: {
      wordlistEntries: [
        {
          categories: [],
          word: {
            text: 'chair'
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
