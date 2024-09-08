import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

type MyWordlistOptions = {
  generateExplanations?: boolean;
};

export const SentencesGeneratorOptions = () => {
  const [generateExplanationsChecked, setGenerateExplanationsChecked] = useState(false);
  const [myWordlistOptions, setMyWordlistOptions] = useState<MyWordlistOptions>({});

  useEffect(() => {
    const getSavedMyWordlistOptions = async () => {
      const unparsedMyWordlistOptions = (await AsyncStorage.getItem('myWordlistOptions')) || '{}';
      const myWordlistOptions = JSON.parse(unparsedMyWordlistOptions);
      setMyWordlistOptions(myWordlistOptions);
    };

    getSavedMyWordlistOptions();
  }, []);

  useEffect(() => {
    setGenerateExplanationsChecked(!!myWordlistOptions.generateExplanations);
  }, [myWordlistOptions]);

  return (
    <Checkbox
      onPress={async () => {
        setGenerateExplanationsChecked(!generateExplanationsChecked);

        const myWordlistOptions = {
          generateExplanations: !generateExplanationsChecked
        };

        await AsyncStorage.mergeItem('myWordlistOptions', JSON.stringify(myWordlistOptions));
      }}
      status={generateExplanationsChecked ? 'checked' : 'unchecked'}
    />
  );
};
