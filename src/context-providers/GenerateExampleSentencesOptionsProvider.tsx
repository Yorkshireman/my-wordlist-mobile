import { GenerateExampleSentencesOptionsContext } from '../contexts';
import { MyWordlistOptions } from '../../types';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Level, NativeLanguage } from '../__generated__/graphql';
import React, { useState } from 'react';

export const GenerateExampleSentencesOptionsProvider = ({
  children
}: {
  children: React.JSX.Element;
}) => {
  const [myWordlistOptions, setMyWordlistOptions] = useState<MyWordlistOptions>({});
  const { getItem, mergeItem: saveOption } = useAsyncStorage('myWordlistOptions');

  const getSavedOptions = async (): Promise<MyWordlistOptions | null> => {
    const currentUnparsedOptions = await getItem();
    if (!currentUnparsedOptions) return null;
    return JSON.parse(currentUnparsedOptions);
  };

  const saveThenSetExampleSentencesCEFRLevel = async (level: Level) => {
    await saveOption(JSON.stringify({ exampleSentencesCEFRlevel: level }));
    setMyWordlistOptions({ ...myWordlistOptions, exampleSentencesCEFRlevel: level });
  };

  const saveThenSetExplanationLanguage = async (language: NativeLanguage | undefined) => {
    let newOptions;
    const currentOptions = await getSavedOptions();
    const currentOptionsClone = { ...currentOptions };

    if (!language) {
      delete currentOptionsClone.explanationLanguage;
      currentOptionsClone.generateExplanations = false;
      newOptions = { ...currentOptionsClone };
    } else {
      newOptions = { ...currentOptionsClone, explanationLanguage: language };
    }

    await AsyncStorage.setItem('myWordlistOptions', JSON.stringify(newOptions));
    const explanationLanguage = (await getSavedOptions())?.explanationLanguage;
    const generateExplanations = (await getSavedOptions())?.generateExplanations;

    setMyWordlistOptions({
      ...myWordlistOptions,
      explanationLanguage,
      generateExplanations: !!generateExplanations
    });
  };

  const saveThenSetGenerateExplanations = async (generateExplanations: boolean) => {
    await saveOption(JSON.stringify({ generateExplanations }));
    setMyWordlistOptions({ ...myWordlistOptions, generateExplanations });
  };

  return (
    <GenerateExampleSentencesOptionsContext.Provider
      value={{
        operations: {
          getSavedOptions,
          saveThenSetExampleSentencesCEFRLevel,
          saveThenSetExplanationLanguage,
          saveThenSetGenerateExplanations
        },
        state: { myWordlistOptions, setMyWordlistOptions }
      }}
    >
      {children}
    </GenerateExampleSentencesOptionsContext.Provider>
  );
};
