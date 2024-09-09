import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExampleSentences } from '../components';
import { Explanation } from '../__generated__/graphql';
import { Loading } from '../components';
import { SentencesGeneratorOptions } from '../components';
import sharedStyles from '../styles';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { GenerateExampleSentencesScreenRouteParams, MyWordlistOptions } from '../../types';
import { IconButton, useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

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
    const {
      generateExplanations,
      explanationLanguage: nativeLanguage,
      exampleSentencesCEFRlevel
    }: MyWordlistOptions = JSON.parse(unparsedOptions || '{}');

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
