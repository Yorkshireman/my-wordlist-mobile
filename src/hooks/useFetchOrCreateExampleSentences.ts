import { FETCH_OR_CREATE_EXAMPLE_SENTENCES } from '../graphql-queries';
import { Level } from '../__generated__/graphql';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

export const useFetchOrCreateExampleSentences = (wordId: string) => {
  const [exampleSentences, setExampleSentences] = useState();

  const [fetchOrCreateExampleSentences, { error, loading }] = useMutation(
    FETCH_OR_CREATE_EXAMPLE_SENTENCES,
    {
      onCompleted: ({ fetchOrCreateExampleSentences }) => {
        const { exampleSentences } = fetchOrCreateExampleSentences || {};
        exampleSentences?.length && setExampleSentences(exampleSentences);
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

  return { error, exampleSentences, loading };
};
