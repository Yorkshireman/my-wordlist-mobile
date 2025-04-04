import { GenerateExampleSentencesOptionsContext } from '../contexts';
import { useRoute } from '@react-navigation/native';
import { ExampleSentences, Loading, ScreenWrapper, SentencesGeneratorOptions } from '../components';
import { Explanation, Level } from '../__generated__/graphql';
import {
  GenerateExampleSentencesOptionsContextType,
  GenerateExampleSentencesScreenRouteParams
} from '../../types';
import { IconButton, useTheme } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  useFetchOrCreateExampleSentences,
  useSetSavedGenerateExampleSentencesScreenOptionsInState as useSetSavedOptionsInState,
  useSnackbar
} from '../hooks';

export const GenerateExampleSentencesScreenWrapper = () => {
  const { colors } = useTheme();
  const [exampleSentences, setExampleSentences] = useState<
    { content: string; explanation?: Explanation | null; form?: string | null; id: string }[]
  >([]);

  const { fetchOrCreateExampleSentences, fetchOrCreateExampleSentencesWithExplanations, loading } =
    useFetchOrCreateExampleSentences(setExampleSentences);

  const {
    operations: { getSavedOptions, saveThenSetExampleSentencesCEFRLevel }
  } = useContext(
    GenerateExampleSentencesOptionsContext
  ) as GenerateExampleSentencesOptionsContextType;

  const { showSnackbar } = useSnackbar();
  useSetSavedOptionsInState();
  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

  const refreshExampleSentences = async () => {
    const options = await getSavedOptions();
    if (!options) {
      const message =
        'GenerateExampleSentencesScreenWrapper, refreshExampleSentences: options from AsyncStorage empty.';
      console.error(message);
      throw new Error(message);
    }

    const {
      generateExplanations,
      explanationLanguage: nativeLanguage,
      exampleSentencesCEFRlevel: level
    } = options;

    if (generateExplanations) {
      fetchOrCreateExampleSentencesWithExplanations({
        variables: {
          level,
          nativeLanguage,
          wordId
        }
      });
    } else {
      fetchOrCreateExampleSentences({
        variables: {
          level,
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

  const handleRefreshButtonPress = async () => {
    const { explanationLanguage, generateExplanations } = (await getSavedOptions()) || {};
    if (generateExplanations && !explanationLanguage) {
      return showSnackbar({
        error: true,
        message: 'To generate explanations, a language must be selected.'
      });
    }

    await refreshExampleSentences();
  };

  return (
    <ScreenWrapper additionalStyles={{ justifyContent: 'flex-start' }}>
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
              onPress={handleRefreshButtonPress}
              size={48}
              testID='refresh-sentences-button'
            />
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};
