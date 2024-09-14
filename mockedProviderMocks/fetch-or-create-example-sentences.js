import { FETCH_OR_CREATE_EXAMPLE_SENTENCES } from '../src/graphql-queries';
/* eslint-disable sort-keys */

export const fetchOrCreateExampleSentences = {
  B1: {
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
  },
  C1: {
    request: {
      query: FETCH_OR_CREATE_EXAMPLE_SENTENCES,
      variables: {
        level: 'C1',
        wordId: '037c35ef-ef8c-49ed-99ab-9812337310ef'
      }
    },
    result: {
      data: {
        fetchOrCreateExampleSentences: {
          exampleSentences: [
            {
              content:
                /* eslint-disable quotes */
                "The architect's design is beautifully understated, highlighting the elegance of simplicity.",
              /* eslint-enable quotes */
              createdAt: '2024-09-11T16:22:53Z',
              form: 'understated',
              id: '839a90d4-7318-49f4-b7c4-40107c474e9c',
              level: 'C1',
              updatedAt: '2024-09-11T16:22:53Z',
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
                'She spoke about her achievements in an understated way, avoiding any hint of arrogance.',
              createdAt: '2024-09-11T20:29:07Z',
              form: 'understated',
              id: 'eac79c30-f185-4332-8452-4af7863766c1',
              level: 'C1',
              updatedAt: '2024-09-11T20:29:07Z',
              word: {
                __typename: 'Word',
                createdAt: '2024-03-14T18:52:32Z',
                id: '037c35ef-ef8c-49ed-99ab-9812337310ef',
                text: 'understated'
              },
              __typename: 'ExampleSentence'
            },
            {
              content: 'Her understated elegance made her the centre of attention at the gala.',
              createdAt: '2024-09-11T20:16:53Z',
              form: 'understated',
              id: 'dcb120c2-c806-42cc-800c-c0619862f9f8',
              level: 'C1',
              updatedAt: '2024-09-11T20:16:53Z',
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
                'She spoke about her achievements in an understated manner, avoiding any showiness.',
              createdAt: '2024-09-11T22:47:43Z',
              form: 'understated',
              id: '97d1ed0a-53ab-42f3-97cf-583132b61460',
              level: 'C1',
              updatedAt: '2024-09-11T22:47:43Z',
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
  }
};

/* eslint-enable sort-keys */
