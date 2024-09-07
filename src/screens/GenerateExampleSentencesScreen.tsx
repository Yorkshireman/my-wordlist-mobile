import { GenerateExampleSentencesScreenRouteParams } from '../../types';
import React from 'react';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';

export const GenerateExampleSentencesScreen = () => {
  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

  useFetchOrCreateExampleSentences(wordId);

  return <View>Hello</View>;
};
