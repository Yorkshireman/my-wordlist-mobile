import { ExampleSentences } from '../components';
import { GenerateExampleSentencesOptionsContext } from './GenerateExampleSentencesOptionsProvider';
import { Loading } from '../components';
import { SentencesGeneratorOptions } from '../components';
import sharedStyles from '../styles';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { Explanation, Level } from '../__generated__/graphql';
import {
  GenerateExampleSentencesOptionsContextType,
  GenerateExampleSentencesScreenRouteParams
} from '../../types';
import { IconButton, useTheme } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

export const GenerateExampleSentencesScreenWrapper = () => {
  const { colors } = useTheme();

  const [exampleSentences, setExampleSentences] = useState<
    { content: string; explanation?: Explanation | null; form?: string | null; id: string }[]
  >([]);

  const { fetchOrCreateExampleSentences, fetchOrCreateExampleSentencesWithExplanations, loading } =
    useFetchOrCreateExampleSentences(setExampleSentences);

  const {
    operations: { getSavedOptions, saveThenSetExampleSentencesCEFRLevel },
    state: { setMyWordlistOptions }
  } = useContext(
    GenerateExampleSentencesOptionsContext
  ) as GenerateExampleSentencesOptionsContextType;

  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

  useEffect(() => {
    const setSavedOptionsInState = async () => {
      const savedOptions = (await getSavedOptions()) || {};
      setMyWordlistOptions(savedOptions);
    };

    setSavedOptionsInState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshExampleSentences = async () => {
    const {
      generateExplanations,
      explanationLanguage: nativeLanguage,
      exampleSentencesCEFRlevel
    } = (await getSavedOptions()) || {};

    if (generateExplanations) {
      fetchOrCreateExampleSentencesWithExplanations({
        variables: {
          level: exampleSentencesCEFRlevel,
          nativeLanguage,
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
  };

  useEffect(() => {
    const fetchExampleSentences = async () => {
      const savedExampleSentencesCEFRLevel = (await getSavedOptions())?.exampleSentencesCEFRlevel;

      if (!savedExampleSentencesCEFRLevel) {
        console.info('No saved exampleSentencesCEFRlevel option.');
        console.info('Setting level to B1.');
        await saveThenSetExampleSentencesCEFRLevel(Level.B1);
      }

      refreshExampleSentences();
    };

    fetchExampleSentences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start' }}>
      <SentencesGeneratorOptions />
      {loading ? (
        <View style={{ marginTop: 80 }}>
          <Loading size='large' />
        </View>
      ) : (
        <ScrollView>
          <ExampleSentences exampleSentences={exampleSentences} />
          <View style={{ alignItems: 'center' }}>
            <IconButton
              icon='refresh'
              iconColor={colors.primary}
              onPress={refreshExampleSentences}
              size={48}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};
