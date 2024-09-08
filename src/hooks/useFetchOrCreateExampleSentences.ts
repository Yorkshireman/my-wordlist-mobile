import { FETCH_OR_CREATE_EXAMPLE_SENTENCES } from '../graphql-queries';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { FetchOrCreateExampleSentencesMutation, Level } from '../__generated__/graphql';

export const useFetchOrCreateExampleSentences = (
  setExampleSentences: (sentences: { content: string; form?: string | null; id: string }[]) => void,
  wordId: string
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

  useEffect(() => {
    fetchOrCreateExampleSentences({
      variables: {
        level: Level.B1,
        wordId
      }
    });
  }, [fetchOrCreateExampleSentences, wordId]);

  return { error, fetchOrCreateExampleSentences, loading };
};
