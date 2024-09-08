import { boldenSentenceForm } from '../utils';
import { Level } from '../__generated__/graphql';
import { Loading } from '../components';
import sharedStyles from '../styles';
import { useFetchOrCreateExampleSentences } from '../hooks';
import { useRoute } from '@react-navigation/native';
import {
  GenerateExampleSentencesScreenProps,
  GenerateExampleSentencesScreenRouteParams
} from '../../types';
import { IconButton, List, Text, useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const GenerateExampleSentencesScreen = ({
  navigation
}: GenerateExampleSentencesScreenProps) => {
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
    <View style={{ ...sharedStyles.container }}>
      {loading ? (
        <Loading size='large' />
      ) : (
        <>
          <Text onPress={() => navigation.navigate('Home')} style={styles.close}>
            Back
          </Text>
          {exampleSentences.map(({ content, form, id }) => (
            <List.Item
              key={id}
              title={boldenSentenceForm({ content, form })}
              titleNumberOfLines={999}
            />
          ))}
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

const styles = StyleSheet.create({
  close: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    top: 20
  }
});
