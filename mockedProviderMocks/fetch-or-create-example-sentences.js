import { FETCH_OR_CREATE_EXAMPLE_SENTENCES } from '../src/graphql-queries';
/* eslint-disable sort-keys */
export const fetchOrCreateExampleSentences = {
  request: {
    query: FETCH_OR_CREATE_EXAMPLE_SENTENCES,
    variables: {
      level: 'B1',
      wordId: '037c35ef-ef8c-49ed-99ab-9812337310ef'
    }
  },
  result: {
    data: {
      fetchOrCreateExampleSentences: {
        exampleSentences: [
          {
            content:
              'He presented his ideas in an understated way that allowed others to join the discussion.',
            createdAt: '2024-09-07T23:59:21Z',
            form: 'understated',
            id: 'ca90edb7-a82e-4460-9a31-8015a88f3420',
            level: 'B1',
            updatedAt: '2024-09-07T23:59:21Z',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-14T18:52:32Z',
              id: '037c35ef-ef8c-49ed-99ab-9812337310ef',
              text: 'understated'
            },
            __typename: 'ExampleSentence'
          },
          {
            /* eslint-disable quotes */
            content:
              "The artist's work is understatedly powerful, resonating with emotion without being loud.",
            /* eslint-enable quotes */
            createdAt: '2024-09-07T23:59:21Z',
            form: null,
            id: 'e8f3445c-144f-49f6-8c91-7407c676c653',
            level: 'B1',
            updatedAt: '2024-09-07T23:59:21Z',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-14T18:52:32Z',
              id: '037c35ef-ef8c-49ed-99ab-9812337310ef',
              text: 'understated'
            },
            __typename: 'ExampleSentence'
          },
          {
            content:
              'She understated her achievements during the interview, even though they were quite impressive.',
            createdAt: '2024-09-07T23:59:21Z',
            form: 'understated',
            id: '9aa6cae3-e012-4056-a2de-7b6dab2021af',
            level: 'B1',
            updatedAt: '2024-09-07T23:59:21Z',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-14T18:52:32Z',
              id: '037c35ef-ef8c-49ed-99ab-9812337310ef',
              text: 'understated'
            },
            __typename: 'ExampleSentence'
          },
          {
            content:
              'The design of the house is beautifully understated, which makes it feel calm and inviting.',
            createdAt: '2024-09-07T23:59:21Z',
            form: 'understated',
            id: '60fc6a0d-b32c-4b2e-b17f-8bc307d3e198',
            level: 'B1',
            updatedAt: '2024-09-07T23:59:21Z',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-14T18:52:32Z',
              id: '037c35ef-ef8c-49ed-99ab-9812337310ef',
              text: 'understated'
            },
            __typename: 'ExampleSentence'
          }
        ],
        __typename: 'FetchOrCreateExampleSentencesPayload'
      }
    }
  }
};
/* eslint-enable sort-keys */
