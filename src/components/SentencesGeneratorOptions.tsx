import { displayLanguage } from '../utils';
import { Level } from '../__generated__/graphql';
import { NativeLanguage } from '../__generated__/graphql';
import { useMyWordlistOptions } from '../hooks';
import { View } from 'react-native';
import { Button, Card, Menu, Switch, Text } from 'react-native-paper';
import React, { useState } from 'react';

export const SentencesGeneratorOptions = () => {
  const {
    exampleSentencesCEFRlevel,
    explanationLanguage,
    generateExplanations,
    operations: {
      saveThenSetExampleSentencesCEFRLevel,
      saveThenSetExplanationLanguage,
      saveThenSetGenerateExplanations
    }
  } = useMyWordlistOptions();

  const [exampleSentencesCEFRlevelMenuVisible, setExampleSentencesCEFRlevelMenuVisible] =
    useState(false);

  const [nativeLanguageMenuVisible, setNativeLanguageMenuVisible] = useState(false);

  const onExampleSentencesCEFRlevelSelect = (level: Level) => async () => {
    await saveThenSetExampleSentencesCEFRLevel(level);
    setExampleSentencesCEFRlevelMenuVisible(false);
  };

  const onExplanationLanguageSelect =
    (selectedExplanationLanguage: NativeLanguage | undefined) => async () => {
      await saveThenSetExplanationLanguage(selectedExplanationLanguage);
      setNativeLanguageMenuVisible(false);
    };

  const onToggleSwitch = async () => {
    await saveThenSetGenerateExplanations(!generateExplanations);
  };

  return (
    <Card style={{ padding: 4 }}>
      <Card.Actions style={{ flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text variant='labelLarge'>Sentences Language Level</Text>
          </View>
          <View>
            <Menu
              anchor={
                <Button
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  icon='chevron-right'
                  onPress={() => setExampleSentencesCEFRlevelMenuVisible(true)}
                >
                  {exampleSentencesCEFRlevel}
                </Button>
              }
              onDismiss={() => setExampleSentencesCEFRlevelMenuVisible(false)}
              visible={exampleSentencesCEFRlevelMenuVisible}
            >
              {Object.values(Level).map(level => (
                <Menu.Item
                  key={level}
                  onPress={onExampleSentencesCEFRlevelSelect(level)}
                  title={level}
                />
              ))}
            </Menu>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text variant='labelLarge'>Generate Explanations</Text>
          <Switch
            disabled={!explanationLanguage}
            onValueChange={onToggleSwitch}
            pointerEvents={explanationLanguage ? 'auto' : 'none'}
            style={{ marginRight: 11 }}
            value={generateExplanations}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text variant='labelLarge'>Your Language</Text>
          </View>
          <View>
            <Menu
              anchor={
                <Button
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  icon='chevron-right'
                  onPress={() => setNativeLanguageMenuVisible(true)}
                >
                  {(explanationLanguage && displayLanguage(explanationLanguage)) || 'Select'}
                </Button>
              }
              onDismiss={() => setNativeLanguageMenuVisible(false)}
              visible={nativeLanguageMenuVisible}
            >
              {[
                <Menu.Item
                  key={'none'}
                  onPress={onExplanationLanguageSelect(undefined)}
                  title={'(none)'}
                />,
                ...Object.values(NativeLanguage).map(language => (
                  <Menu.Item
                    key={language}
                    onPress={onExplanationLanguageSelect(language)}
                    title={displayLanguage(language)}
                  />
                ))
              ]}
            </Menu>
          </View>
        </View>
      </Card.Actions>
    </Card>
  );
};
