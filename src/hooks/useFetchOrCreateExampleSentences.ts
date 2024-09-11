import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useMyWordlistOptions } from './useMyWordlistOptions';
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
  ) => void,
  wordId: string
) => {
  const { exampleSentencesCEFRlevel, generateExplanations, explanationLanguage } =
    useMyWordlistOptions();

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

  useEffect(() => {
    if (!exampleSentencesCEFRlevel) {
      return console.error(
        'useFetchOrCreateExampleSentences.ts: exampleSentencesCEFRlevel is falsey'
      );
    }

    if (generateExplanations) {
      fetchOrCreateExampleSentencesWithExplanations({
        variables: {
          level: exampleSentencesCEFRlevel,
          nativeLanguage: explanationLanguage,
          wordId
        }
      });
    } else {
      fetchOrCreateExampleSentences({
        variables: {
          level: exampleSentencesCEFRlevel,
          wordId
        }
      });
    }
  }, [
    exampleSentencesCEFRlevel,
    explanationLanguage,
    fetchOrCreateExampleSentences,
    fetchOrCreateExampleSentencesWithExplanations,
    generateExplanations,
    wordId
  ]);

  return {
    error: error || _error,
    fetchOrCreateExampleSentences,
    fetchOrCreateExampleSentencesWithExplanations,
    loading: loading || _loading
  };
};
