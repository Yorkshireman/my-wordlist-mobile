import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExampleSentences } from '../components';
import { Loading } from '../components';
import { SentencesGeneratorOptions } from '../components';
import sharedStyles from '../styles';
import { useRoute } from '@react-navigation/native';
import { Explanation, Level } from '../__generated__/graphql';
import { GenerateExampleSentencesScreenRouteParams, MyWordlistOptions } from '../../types';
import { IconButton, useTheme } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useFetchOrCreateExampleSentences, useMyWordlistOptions } from '../hooks';

export const GenerateExampleSentencesScreen = () => {
  const { colors } = useTheme();
  const [exampleSentences, setExampleSentences] = useState<
    { content: string; explanation?: Explanation | null; form?: string | null; id: string }[]
  >([]);

  const { fetchOrCreateExampleSentences, fetchOrCreateExampleSentencesWithExplanations, loading } =
    useFetchOrCreateExampleSentences(setExampleSentences);

  const {
    operations: { saveThenSetExampleSentencesCEFRLevel }
  } = useMyWordlistOptions();

  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

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

  useEffect(() => {
    const fetchExampleSentences = async () => {
      const currentUnparsedOptions = (await AsyncStorage.getItem('myWordlistOptions')) || '{}';
      const myWordlistOptions = JSON.parse(currentUnparsedOptions);

      if (!myWordlistOptions.exampleSentencesCEFRlevel) {
        console.info('GenerateExampleSentencesScreen.tsx: exampleSentencesCEFRlevel is falsey');
        console.info('GenerateExampleSentencesScreen.tsx: setting level to B1');
        await saveThenSetExampleSentencesCEFRLevel(Level.B1);
      }

      refreshExampleSentences();
    };

    fetchExampleSentences();
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
