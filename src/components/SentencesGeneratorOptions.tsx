import AsyncStorage from '@react-native-async-storage/async-storage';
import { displayLanguage } from '../utils';
import { Level } from '../__generated__/graphql';
import { MyWordlistOptions } from '../../types';
import { NativeLanguage } from '../__generated__/graphql';
import { View } from 'react-native';
import { Button, Card, Menu, Switch, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

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
  const [explanationLanguage, setExplanationLanguage] = useState<NativeLanguage | undefined>();
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
    (selectedExplanationLanguage: NativeLanguage | undefined) => async () => {
      setNativeLanguageMenuVisible(false);
      setExplanationLanguage(selectedExplanationLanguage);
      const currentUnparsedOptions = await AsyncStorage.getItem('myWordlistOptions');
      const { exampleSentencesCEFRlevel: currentExampleSentencesCEFRLevel } = JSON.parse(
        currentUnparsedOptions || '{}'
      );

      if (!selectedExplanationLanguage) {
        await AsyncStorage.setItem(
          'myWordlistOptions',
          JSON.stringify({
            exampleSentencesCEFRlevel: currentExampleSentencesCEFRLevel,
            generateExplanations: false
          })
        );
        setGenerateExplanationsChecked(false);
      } else {
        await AsyncStorage.mergeItem(
          'myWordlistOptions',
          JSON.stringify({ explanationLanguage: selectedExplanationLanguage })
        );
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
            value={generateExplanationsChecked}
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
