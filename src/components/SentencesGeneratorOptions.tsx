import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Button, Card, Menu, Switch, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

type MyWordlistOptions = {
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
  const [nativeLanguageMenuVisible, setNativeLanguageMenuVisible] = useState(false);
  const [myWordlistOptions, setMyWordlistOptions] = useState<MyWordlistOptions>({});
  useGetSavedMyWordlistOptions(setMyWordlistOptions);

  useEffect(() => {
    setGenerateExplanationsChecked(!!myWordlistOptions.generateExplanations);
  }, [myWordlistOptions]);

  const onToggleSwitch = async () => {
    setGenerateExplanationsChecked(!generateExplanationsChecked);
    const myWordlistOptions = {
      generateExplanations: !generateExplanationsChecked
    };

    await AsyncStorage.mergeItem('myWordlistOptions', JSON.stringify(myWordlistOptions));
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
                  Select
                </Button>
              }
              onDismiss={() => setNativeLanguageMenuVisible(false)}
              visible={nativeLanguageMenuVisible}
            >
              <Menu.Item onPress={() => null} title='Language 1' />
              <Menu.Item onPress={() => null} title='Language 2' />
              <Menu.Item onPress={() => null} title='Language 3' />
            </Menu>
          </View>
        </View>
      </Card.Actions>
    </Card>
  );
};
