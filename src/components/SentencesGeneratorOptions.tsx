import AsyncStorage from '@react-native-async-storage/async-storage';
import { displayLanguage } from '../utils';
import { ExplanationLanguage } from '../../types';
import { View } from 'react-native';
import { Button, Card, Menu, Switch, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

type MyWordlistOptions = {
  explanationLanguage?: ExplanationLanguage;
  generateExplanations?: boolean;
};

const useGetSavedMyWordlistOptions = async (
  setMyWordlistOptions: (arg0: MyWordlistOptions) => void
) => {
  useEffect(() => {
    const getSavedMyWordlistOptions = async () => {
      const unparsedMyWordlistOptions = (await AsyncStorage.getItem('myWordlistOptions')) || '';
      const myWordlistOptions = JSON.parse(unparsedMyWordlistOptions);
      setMyWordlistOptions(myWordlistOptions);
    };

    getSavedMyWordlistOptions();
  }, [setMyWordlistOptions]);
};

export const SentencesGeneratorOptions = () => {
  const [generateExplanationsChecked, setGenerateExplanationsChecked] = useState(false);
  const [explanationLanguage, setExplanationLanguage] = useState<ExplanationLanguage | undefined>();
  const [nativeLanguageMenuVisible, setNativeLanguageMenuVisible] = useState(false);
  const [myWordlistOptions, setMyWordlistOptions] = useState<MyWordlistOptions>({});
  useGetSavedMyWordlistOptions(setMyWordlistOptions);

  useEffect(() => {
    setExplanationLanguage(myWordlistOptions.explanationLanguage);
    setGenerateExplanationsChecked(!!myWordlistOptions.generateExplanations);
  }, [myWordlistOptions]);

  const onExplanationLanguageSelect = (explanationLanguage: ExplanationLanguage) => async () => {
    setNativeLanguageMenuVisible(false);
    await AsyncStorage.mergeItem('myWordlistOptions', JSON.stringify({ explanationLanguage }));
    setExplanationLanguage(explanationLanguage);
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
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text variant='labelLarge'>Generate Explanations</Text>
          <Switch
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
              {Object.values(ExplanationLanguage).map(language => (
                <Menu.Item
                  key={language}
                  onPress={onExplanationLanguageSelect(language)}
                  title={displayLanguage(language)}
                />
              ))}
            </Menu>
          </View>
        </View>
      </Card.Actions>
    </Card>
  );
};
