import { FETCH_OR_CREATE_EXAMPLE_SENTENCES } from '../graphql-queries';
import { useMutation } from '@apollo/client';
import { FetchOrCreateExampleSentencesMutation, Level } from '../__generated__/graphql';
import { useEffect, useState } from 'react';

export const useFetchOrCreateExampleSentences = (wordId: string) => {
  const [exampleSentences, setExampleSentences] = useState<
    { content: string; form?: string | null; id: string }[]
  >([]);

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

  return { error, exampleSentences, fetchOrCreateExampleSentences, loading };
};
