import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  FETCH_OR_CREATE_EXAMPLE_SENTENCES,
  FETCH_OR_CREATE_EXAMPLE_SENTENCES_WITH_EXPLANATIONS
} from '../graphql-queries';
import {
  FetchOrCreateExampleSentencesMutation,
  FetchOrCreateExampleSentencesWithExplanationsMutation,
  Level
} from '../__generated__/graphql';

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

  const [fetchOrCreateExampleSentencesWithExplanations, { error: _error, loading: _loading }] =
    useMutation(FETCH_OR_CREATE_EXAMPLE_SENTENCES_WITH_EXPLANATIONS, {
      onCompleted: (data: FetchOrCreateExampleSentencesWithExplanationsMutation) => {
        const { fetchOrCreateExampleSentences } = data;
        const { exampleSentences } = fetchOrCreateExampleSentences || {};
        const sentences = exampleSentences?.map(({ content, form, id }) => ({
          content,
          form,
          id
        }));
        setExampleSentences(sentences || []);
      }
    });

  useEffect(() => {
    const fetch = async () => {
      const unparsedOptions: string | null = await AsyncStorage.getItem('myWordlistOptions');
      const { generateExplanations, explanationLanguage: nativeLanguage } = JSON.parse(
        unparsedOptions || '{}'
      );

      if (generateExplanations) {
        fetchOrCreateExampleSentencesWithExplanations({
          variables: {
            level: Level.B1,
            nativeLanguage,
            wordId
          }
        });
      } else {
        fetchOrCreateExampleSentences({
          variables: {
            level: Level.B1,
            wordId
          }
        });
      }
    };

    fetch();
  }, [fetchOrCreateExampleSentences, fetchOrCreateExampleSentencesWithExplanations, wordId]);

  return {
    error: error || _error,
    fetchOrCreateExampleSentences,
    fetchOrCreateExampleSentencesWithExplanations,
    loading: loading || _loading
  };
};
