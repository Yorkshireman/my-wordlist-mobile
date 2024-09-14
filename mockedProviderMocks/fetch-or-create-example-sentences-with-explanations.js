import { FETCH_OR_CREATE_EXAMPLE_SENTENCES_WITH_EXPLANATIONS } from '../src/graphql-queries';
/* eslint-disable sort-keys */

export const fetchOrCreateExampleSentencesWithExplanations = {
  B1Italian: {
    request: {
      query: FETCH_OR_CREATE_EXAMPLE_SENTENCES_WITH_EXPLANATIONS,
      variables: {
        level: 'B1',
        nativeLanguage: 'Italian',
        wordId: '037c35ef-ef8c-49ed-99ab-9812337310ef'
      }
    },
    result: {
      data: {
        fetchOrCreateExampleSentences: {
          exampleSentences: [
            {
              content:
                'He understated his achievements during the interview, which made him seem modest.',
              createdAt: '2024-09-13T20:42:00Z',
              explanation: {
                content:
                  /* eslint-disable quotes */
                  "Here, 'understated' is used to describe how he represented his achievements as less significant than they are. By doing this, he appeared humble in the interview. In italiano, significa che ha minimizzato i suoi successi. Questo uso mostra una tendenza a non vantarsi troppo, creando un'impressione di modestia.",
                /* eslint-enable quotes */
                createdAt: '2024-09-13T20:42:00Z',
                exampleSentenceId: '33d89c2c-eb12-4c0e-b9ef-214b07679fc5',
                id: '254df577-51bb-429e-aefa-da12a97cf81c',
                language: 'Italian',
                updatedAt: '2024-09-13T20:42:00Z',
                __typename: 'Explanation'
              },
              form: 'understated',
              id: '33d89c2c-eb12-4c0e-b9ef-214b07679fc5',
              level: 'B1',
              updatedAt: '2024-09-13T20:42:00Z',
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
                'She spoke about the project understatedly, highlighting its challenges instead of its successes.',
              createdAt: '2024-09-13T20:42:00Z',
              explanation: {
                content:
                  /* eslint-disable quotes */
                  "In this sentence, 'understatedly' is an adverb that describes the way she spoke. It suggests that her focus was on the difficulties faced in the project rather than celebrating its successes. Questo uso dell'avverbio implica che ha scelto di porre l'accento sugli aspetti negativi, rendendo il suo discorso più realistico piuttosto che ottimista.",
                /* eslint-enable quotes */
                createdAt: '2024-09-13T20:42:00Z',
                exampleSentenceId: '2dde97cf-4780-4369-94ab-00201c1a880e',
                id: '27c4455e-81ff-4511-9483-e81eb398e303',
                language: 'Italian',
                updatedAt: '2024-09-13T20:42:00Z',
                __typename: 'Explanation'
              },
              form: null,
              id: '2dde97cf-4780-4369-94ab-00201c1a880e',
              level: 'B1',
              updatedAt: '2024-09-13T20:42:00Z',
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
                'Her outfit was beautifully understated, focusing on simplicity rather than showiness.',
              createdAt: '2024-09-13T20:42:00Z',
              explanation: {
                content:
                  /* eslint-disable quotes */
                  "In this sentence, 'understated' describes the outfit as simple and elegant without being flashy or overly complicated. This means that her style highlights minimalism and good taste, which can be very appealing. In italiano, possiamo dire che l'abito era elegante in modo semplice, senza sfoggiare forme appariscenti. L'idea di 'understated' implica un'eleganza sobria.",
                /* eslint-enable quotes */
                createdAt: '2024-09-13T20:42:00Z',
                exampleSentenceId: 'e6964244-318c-4435-92de-ac8243413346',
                id: '710009bc-d432-4537-9c21-a394607dec15',
                language: 'Italian',
                updatedAt: '2024-09-13T20:42:00Z',
                __typename: 'Explanation'
              },
              form: 'understated',
              id: 'e6964244-318c-4435-92de-ac8243413346',
              level: 'B1',
              updatedAt: '2024-09-13T20:42:00Z',
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
                /* eslint-disable quotes */
                "It's important not to understate the impact of climate change on our environment.",
              /* eslint-enable quotes */
              createdAt: '2024-09-13T20:42:00Z',
              explanation: {
                content:
                  /* eslint-disable quotes */
                  "In this sentence, 'understate' is a verb that means to present something as less important or serious than it really is. The implication is that we should recognize and communicate the serious effects of climate change clearly. In italiano, significa che non dobbiamo minimizzare le conseguenze del cambiamento climatico. Questo è cruciale per sensibilizzare le persone riguardo a una questione così seria.",
                /* eslint-enable quotes */
                createdAt: '2024-09-13T20:42:00Z',
                exampleSentenceId: 'cfedbee3-e361-4653-9188-b81a95e1cf7b',
                id: '87bf82dd-9ad7-4706-9952-b8cb1ed3793c',
                language: 'Italian',
                updatedAt: '2024-09-13T20:42:00Z',
                __typename: 'Explanation'
              },
              form: 'understate',
              id: 'cfedbee3-e361-4653-9188-b81a95e1cf7b',
              level: 'B1',
              updatedAt: '2024-09-13T20:42:00Z',
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
