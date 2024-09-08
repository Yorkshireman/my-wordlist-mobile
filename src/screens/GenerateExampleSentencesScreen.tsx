import { Level } from '../__generated__/graphql';
import { Loading } from '../components';
import React from 'react';
import sharedStyles from '../styles';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import {
  GenerateExampleSentencesScreenProps,
  GenerateExampleSentencesScreenRouteParams
} from '../../types';
import { IconButton, List, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const GenerateExampleSentencesScreen = ({
  navigation
}: GenerateExampleSentencesScreenProps) => {
  const {
    params: { wordId }
  } = useRoute<GenerateExampleSentencesScreenRouteParams>();

  const { exampleSentences, fetchOrCreateExampleSentences, loading } =
    useFetchOrCreateExampleSentences(wordId);

  const refreshExampleSentences = () => {
    fetchOrCreateExampleSentences({ variables: { level: Level.B1, wordId } });
  };

  return (
    <View style={{ ...sharedStyles.container }}>
      {loading && <Loading size='large' />}
      <Text onPress={() => navigation.navigate('Home')} style={styles.close}>
        Back
      </Text>
      {exampleSentences.map(({ content, id }) => (
        <List.Item key={id} title={content} titleNumberOfLines={999} />
      ))}
      <IconButton icon='refresh' onPress={refreshExampleSentences} />
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    top: 20
  }
});
