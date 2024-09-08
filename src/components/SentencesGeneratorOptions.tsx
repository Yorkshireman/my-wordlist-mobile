import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

export const SentencesGeneratorOptions = () => {
  const [generateExplanationsChecked, setGenerateExplanationsChecked] = useState(false);

  useEffect(() => {
    const getMyWordlistOptions = async () => {
      const myWordlistOptions = (await AsyncStorage.getItem('myWordlistOptions')) || '{}';
      const { generateExplanations } = JSON.parse(myWordlistOptions);
      setGenerateExplanationsChecked(generateExplanations);
    };

    getMyWordlistOptions();
  }, []);

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
