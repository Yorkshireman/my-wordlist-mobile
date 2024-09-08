import { ExampleSentences } from '../components';
import { GenerateExampleSentencesScreenRouteParams } from '../../types';
import { Level } from '../__generated__/graphql';
import { Loading } from '../components';
import { SentencesGeneratorOptions } from '../components';
import sharedStyles from '../styles';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import React, { useState } from 'react';

export const GenerateExampleSentencesScreen = () => {
  const { colors } = useTheme();
  const [exampleSentences, setExampleSentences] = useState<
    { content: string; form?: string | null; id: string }[]
  >([]);
  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

  const { fetchOrCreateExampleSentences, loading } = useFetchOrCreateExampleSentences(
    setExampleSentences,
    wordId
  );

  const refreshExampleSentences = () => {
    fetchOrCreateExampleSentences({ variables: { level: Level.B1, wordId } });
  };

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start' }}>
      <SentencesGeneratorOptions />
      {loading ? (
        <Loading size='large' />
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
