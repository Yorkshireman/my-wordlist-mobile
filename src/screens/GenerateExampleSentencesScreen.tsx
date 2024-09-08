import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExampleSentences } from '../components';
import { GenerateExampleSentencesScreenRouteParams } from '../../types';
import { Loading } from '../components';
import { SentencesGeneratorOptions } from '../components';
import sharedStyles from '../styles';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Explanation, Level } from '../__generated__/graphql';
import { IconButton, useTheme } from 'react-native-paper';
import React, { useState } from 'react';

export const GenerateExampleSentencesScreen = () => {
  const { colors } = useTheme();
  const [exampleSentences, setExampleSentences] = useState<
    { content: string; explanation?: Explanation | null; form?: string | null; id: string }[]
  >([]);
  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

  const { fetchOrCreateExampleSentences, fetchOrCreateExampleSentencesWithExplanations, loading } =
    useFetchOrCreateExampleSentences(setExampleSentences, wordId);

  const refreshExampleSentences = async () => {
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

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start' }}>
      <SentencesGeneratorOptions />
      {loading ? (
        <View style={{ marginTop: 80 }}>
          <Loading size='large' />
        </View>
      ) : (
        <>
          <ExampleSentences exampleSentences={exampleSentences} />
          <View style={{ alignItems: 'center' }}>
            <IconButton
              icon='refresh'
              iconColor={colors.primary}
              onPress={refreshExampleSentences}
              size={48}
            />
          </View>
        </>
      )}
    </View>
  );
};
