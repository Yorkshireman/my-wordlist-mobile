import { GenerateExampleSentencesScreenRouteParams } from '../../types';
import React from 'react';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';

export const GenerateExampleSentencesScreen = () => {
  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

  const { exampleSentences, error, loading } = useFetchOrCreateExampleSentences(wordId);

  if (loading) return <View>Loading...</View>;
  if (error) return <View>Error</View>;
  console.log('========== start ==========');
  console.log(JSON.stringify(exampleSentences, null, 2));
  console.log('========== end ===========');
  return <View>Hello</View>;
};
