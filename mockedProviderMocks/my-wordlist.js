import { MY_WORDLIST } from '../src/graphql-queries';

export const myWordlistQueryMock = {
  request: {
    query: MY_WORDLIST
  },
  result: {
    data: {
      authToken: 'auth-token-from-query-response',
      myWordlist: {
        __typename: 'MyWordlist',
        entries: [
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
                name: 'noun'
              },
              {
                __typename: 'Category',
                id: 'f7302234-57b4-4234-b9c7-5483a84e6bf7',
                name: 'tech'
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
        ],
        id: 'de728808-3df2-4dfc-adf9-5981ee5f795a'
      }
    }
  }
};
