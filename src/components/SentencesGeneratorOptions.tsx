import AsyncStorage from '@react-native-async-storage/async-storage';
import { displayLanguage } from '../utils';
import { ExplanationLanguage } from '../../types';
import { Level } from '../__generated__/graphql';
import { View } from 'react-native';
import { Button, Card, Divider, Menu, Switch, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

type MyWordlistOptions = {
  exampleSentencesCEFRlevel?: Level;
  explanationLanguage?: ExplanationLanguage;
  generateExplanations?: boolean;
};

const useGetSavedMyWordlistOptions = async (
  setMyWordlistOptions: (arg0: MyWordlistOptions) => void
) => {
  useEffect(() => {
    const getSavedMyWordlistOptions = async () => {
      const unparsedMyWordlistOptions = (await AsyncStorage.getItem('myWordlistOptions')) || '{}';
      const myWordlistOptions = JSON.parse(unparsedMyWordlistOptions);
      if (!myWordlistOptions.exampleSentencesCEFRlevel) {
        await AsyncStorage.mergeItem(
          'myWordlistOptions',
          JSON.stringify({ exampleSentencesCEFRlevel: Level.B1 })
        );

        return setMyWordlistOptions({ ...myWordlistOptions, exampleSentencesCEFRlevel: Level.B1 });
      }

      setMyWordlistOptions(myWordlistOptions);
    };

    getSavedMyWordlistOptions();
  }, [setMyWordlistOptions]);
};

export const SentencesGeneratorOptions = () => {
  const [exampleSentencesCEFRlevel, setExampleSentencesCEFRlevel] = useState<Level>();
  const [exampleSentencesCEFRlevelMenuVisible, setExampleSentencesCEFRlevelMenuVisible] =
    useState(false);
  const [explanationLanguage, setExplanationLanguage] = useState<ExplanationLanguage | undefined>();
  const [generateExplanationsChecked, setGenerateExplanationsChecked] = useState(false);
  const [myWordlistOptions, setMyWordlistOptions] = useState<MyWordlistOptions>({});
  const [nativeLanguageMenuVisible, setNativeLanguageMenuVisible] = useState(false);
  useGetSavedMyWordlistOptions(setMyWordlistOptions);

  useEffect(() => {
    setExampleSentencesCEFRlevel(myWordlistOptions.exampleSentencesCEFRlevel);
    setExplanationLanguage(myWordlistOptions.explanationLanguage);
    setGenerateExplanationsChecked(!!myWordlistOptions.generateExplanations);
  }, [myWordlistOptions]);

  const onExampleSentencesCEFRlevelSelect = (level: Level) => async () => {
    setExampleSentencesCEFRlevelMenuVisible(false);
    setExampleSentencesCEFRlevel(level);
    await AsyncStorage.mergeItem(
      'myWordlistOptions',
      JSON.stringify({ exampleSentencesCEFRlevel: level })
    );
  };

  const onExplanationLanguageSelect =
    (explanationLanguage: ExplanationLanguage | undefined) => async () => {
      setNativeLanguageMenuVisible(false);
      setExplanationLanguage(explanationLanguage);
      if (!explanationLanguage) {
        await AsyncStorage.setItem(
          'myWordlistOptions',
          JSON.stringify({ generateExplanations: false })
        );

        setGenerateExplanationsChecked(false);
      } else {
        await AsyncStorage.mergeItem('myWordlistOptions', JSON.stringify({ explanationLanguage }));
      }
    };

  const onToggleSwitch = async () => {
    await AsyncStorage.mergeItem(
      'myWordlistOptions',
      JSON.stringify({ generateExplanations: !generateExplanationsChecked })
    );

    setGenerateExplanationsChecked(!generateExplanationsChecked);
  };

  return (
    <Card style={{ padding: 4 }}>
      <Card.Actions style={{ flexDirection: 'column', gap: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text variant='labelLarge'>Sentences Language Level</Text>
          </View>
          <View style={{ position: 'absolute', right: -12, top: -9 }}>
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
        <Divider />
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text variant='labelLarge'>Generate Explanations</Text>
          <Switch
            disabled={!explanationLanguage}
            onValueChange={onToggleSwitch}
            style={{ position: 'absolute', right: 5 }}
            value={generateExplanationsChecked}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text variant='labelLarge'>Language</Text>
          </View>
          <View style={{ position: 'absolute', right: -12, top: -9 }}>
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
                ...Object.values(ExplanationLanguage).map(language => (
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
