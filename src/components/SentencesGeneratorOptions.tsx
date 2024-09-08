import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import { View } from 'react-native';
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
  const [myWordlistOptions, setMyWordlistOptions] = useState<MyWordlistOptions>({});
  useGetSavedMyWordlistOptions(setMyWordlistOptions);

  useEffect(() => {
    setGenerateExplanationsChecked(!!myWordlistOptions.generateExplanations);
  }, [myWordlistOptions]);

  const handleCheckboxPress = async () => {
    setGenerateExplanationsChecked(!generateExplanationsChecked);
    const myWordlistOptions = {
      generateExplanations: !generateExplanationsChecked
    };

    await AsyncStorage.mergeItem('myWordlistOptions', JSON.stringify(myWordlistOptions));
  };

  return (
    <View>
      <Checkbox.Item
        label='Generate Explanations'
        labelStyle={{ textAlign: 'right' }}
        onPress={handleCheckboxPress}
        status={generateExplanationsChecked ? 'checked' : 'unchecked'}
      />
    </View>
  );
};
