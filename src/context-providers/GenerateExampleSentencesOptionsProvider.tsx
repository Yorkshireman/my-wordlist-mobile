import { GenerateExampleSentencesOptionsContext } from '../contexts';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { GenerateExampleSentencesScreenOptions, MyWordlistStorage } from '../../types';
import { Level, NativeLanguage } from '../__generated__/graphql';
import React, { useState } from 'react';

type SingleOption = {
  [K in keyof GenerateExampleSentencesScreenOptions]: {
    [P in K]: GenerateExampleSentencesScreenOptions[K];
  };
}[keyof GenerateExampleSentencesScreenOptions];

export const GenerateExampleSentencesOptionsProvider = ({
  children
}: {
  children: React.JSX.Element;
}) => {
  const [options, setOptions] = useState<GenerateExampleSentencesScreenOptions>({});
  const { getItem, mergeItem, setItem } = useAsyncStorage('myWordlist');

  const getSavedOptions = async (): Promise<GenerateExampleSentencesScreenOptions | null> => {
    try {
      const json = await getItem();
      if (!json) return null;
      const myWordlist: MyWordlistStorage = JSON.parse(json);
      return myWordlist.generateExampleSentencesScreenOptions || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const saveOption = async (option: SingleOption) => {
    const currentOptions = await getSavedOptions();
    return mergeItem(
      JSON.stringify({
        generateExampleSentencesScreenOptions: { ...currentOptions, ...option }
      })
    );
  };

  const saveThenSetExampleSentencesCEFRLevel = async (level: Level) => {
    await saveOption({ exampleSentencesCEFRlevel: level });
    setOptions({ ...options, exampleSentencesCEFRlevel: level });
  };

  const saveThenSetExplanationLanguage = async (language: NativeLanguage | undefined) => {
    let newOptions: GenerateExampleSentencesScreenOptions;
    const currentOptions = await getSavedOptions();
    const currentOptionsClone = { ...currentOptions };

    if (!language) {
      delete currentOptionsClone.explanationLanguage;
      currentOptionsClone.generateExplanations = false;
      newOptions = { ...currentOptionsClone };
    } else {
      newOptions = { ...currentOptionsClone, explanationLanguage: language };
    }

    await setItem(JSON.stringify({ generateExampleSentencesScreenOptions: { ...newOptions } }));

    const explanationLanguage = (await getSavedOptions())?.explanationLanguage;
    const generateExplanations = (await getSavedOptions())?.generateExplanations;

    setOptions({
      ...options,
      explanationLanguage,
      generateExplanations: !!generateExplanations
    });
  };

  const saveThenSetGenerateExplanations = async (generateExplanations: boolean) => {
    await saveOption({ generateExplanations });
    setOptions({ ...options, generateExplanations });
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
        state: { options, setOptions }
      }}
    >
      {children}
    </GenerateExampleSentencesOptionsContext.Provider>
  );
};
