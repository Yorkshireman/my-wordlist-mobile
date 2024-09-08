import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Button, Card, Menu, Switch, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

enum ExplanationLanguage {
  Chinese = 'Chinese Simplified',
  French = 'French',
  German = 'German',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Portuguese = 'Portuguese',
  Russian = 'Russian',
  Spanish = 'Spanish'
}

type MyWordlistOptions = {
  explanationLanguage?: ExplanationLanguage;
  generateExplanations?: boolean;
};

const displayLanguage = (explanationLanguage: ExplanationLanguage) => {
  let displayLanguage = '';
  switch (explanationLanguage) {
    case ExplanationLanguage.Chinese:
      displayLanguage = '简体中文 (Chinese Simplified)';
      break;
    case ExplanationLanguage.French:
      displayLanguage = 'Français (French)';
      break;
    case ExplanationLanguage.German:
      displayLanguage = 'Deutsch (German)';
      break;
    case ExplanationLanguage.Italian:
      displayLanguage = 'Italiano (Italian)';
      break;
    case ExplanationLanguage.Japanese:
      displayLanguage = '日本語 (Japanese)';
      break;
    case ExplanationLanguage.Portuguese:
      displayLanguage = 'Português (Portuguese)';
      break;
    case ExplanationLanguage.Russian:
      displayLanguage = 'Русский (Russian)';
      break;
    case ExplanationLanguage.Spanish:
      displayLanguage = 'Español (Spanish)';
      break;
  }

  return displayLanguage;
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

  const onToggleSwitch = async () => {
    await AsyncStorage.mergeItem(
      'myWordlistOptions',
      JSON.stringify({ generateExplanations: !generateExplanationsChecked })
    );

    setGenerateExplanationsChecked(!generateExplanationsChecked);
  };

  const onExplanationLanguageSelect = (explanationLanguage: ExplanationLanguage) => async () => {
    setNativeLanguageMenuVisible(false);
    await AsyncStorage.mergeItem('myWordlistOptions', JSON.stringify({ explanationLanguage }));
    setExplanationLanguage(explanationLanguage);
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
            <Text variant='labelLarge'>Native Language</Text>
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
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.Chinese)}
                title={displayLanguage(ExplanationLanguage.Chinese)}
              />
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.French)}
                title={displayLanguage(ExplanationLanguage.French)}
              />
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.German)}
                title={displayLanguage(ExplanationLanguage.German)}
              />
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.Italian)}
                title={displayLanguage(ExplanationLanguage.Italian)}
              />
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.Japanese)}
                title={displayLanguage(ExplanationLanguage.Japanese)}
              />
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.Portuguese)}
                title={displayLanguage(ExplanationLanguage.Portuguese)}
              />
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.Russian)}
                title={displayLanguage(ExplanationLanguage.Russian)}
              />
              <Menu.Item
                onPress={onExplanationLanguageSelect(ExplanationLanguage.Spanish)}
                title={displayLanguage(ExplanationLanguage.Spanish)}
              />
            </Menu>
          </View>
        </View>
      </Card.Actions>
    </Card>
  );
};
