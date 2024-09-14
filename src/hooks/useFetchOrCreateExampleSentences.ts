import { useMutation } from '@apollo/client';
import {
  Explanation,
  FetchOrCreateExampleSentencesMutation,
  FetchOrCreateExampleSentencesWithExplanationsMutation
} from '../__generated__/graphql';
import {
  FETCH_OR_CREATE_EXAMPLE_SENTENCES,
  FETCH_OR_CREATE_EXAMPLE_SENTENCES_WITH_EXPLANATIONS
} from '../graphql-queries';

export const useFetchOrCreateExampleSentences = (
  setExampleSentences: (
    sentences: {
      content: string;
      explanation?: Explanation | null;
      form?: string | null;
      id: string;
    }[]
  ) => void
) => {
  const [fetchOrCreateExampleSentences, { error, loading }] = useMutation(
    FETCH_OR_CREATE_EXAMPLE_SENTENCES,
    {
      onCompleted: (data: FetchOrCreateExampleSentencesMutation) => {
        const { fetchOrCreateExampleSentences } = data;
        const { exampleSentences } = fetchOrCreateExampleSentences || {};
        const sentences = exampleSentences?.map(({ content, form, id }) => ({ content, form, id }));
        setExampleSentences(sentences || []);
      }
    }
  );

  const [fetchOrCreateExampleSentencesWithExplanations, { error: _error, loading: _loading }] =
    useMutation(FETCH_OR_CREATE_EXAMPLE_SENTENCES_WITH_EXPLANATIONS, {
      onCompleted: (data: FetchOrCreateExampleSentencesWithExplanationsMutation) => {
        const { fetchOrCreateExampleSentences } = data;
        const { exampleSentences } = fetchOrCreateExampleSentences || {};

        const sentences = exampleSentences?.map(({ content, explanation, form, id }) => ({
          content,
          explanation,
          form,
          id
        }));

        setExampleSentences(sentences || []);
      }
    });

  return {
    error: error || _error,
    fetchOrCreateExampleSentences,
    fetchOrCreateExampleSentencesWithExplanations,
    loading: loading || _loading
  };
};
