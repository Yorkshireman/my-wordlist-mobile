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
                id: '44458ace-7679-49e0-b99a-a8738b1c248d',
                name: 'transport'
              }
            ],
            createdAt: '2024-05-03T17:43:46Z',
            id: '3bac9caa-77b7-4b3f-b1b4-9fcb5d6f2ff6',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:43:46Z',
              id: '04ccddda-252c-4996-9e8a-4e26a61a488b',
              text: 'motorway'
            },
            wordId: '04ccddda-252c-4996-9e8a-4e26a61a488b',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf'
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                id: '82d5375f-9a34-4c2d-b9c2-8b24b88b066e',
                name: 'adverb'
              }
            ],
            createdAt: '2024-05-03T17:43:04Z',
            id: 'a0049345-e75b-4142-9417-410d674d5561',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:43:04Z',
              id: 'da40fa00-cb7d-4119-9f38-bfe10b1ea50e',
              text: 'funnily'
            },
            wordId: 'da40fa00-cb7d-4119-9f38-bfe10b1ea50e',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf'
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              },
              {
                __typename: 'Category',
                id: 'b368ab77-04cf-438b-b6b2-add9afbf2d3d',
                name: 'anatomy'
              }
            ],
            createdAt: '2024-05-03T17:42:51Z',
            id: 'd150b531-ad0c-4b5f-a431-df4948450f8b',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:42:51Z',
              id: 'd0b669fc-71ba-4c81-87f2-90aa53c4d71b',
              text: 'arterial'
            },
            wordId: 'd0b669fc-71ba-4c81-87f2-90aa53c4d71b',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf'
          },
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
