import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { GenerateExampleSentencesOptionsContextType, MyWordlistOptions } from '../../types';
import { Level, NativeLanguage } from '../__generated__/graphql';
import React, { createContext, useEffect, useState } from 'react';

export const GenerateExampleSentencesOptionsContext = createContext<
  GenerateExampleSentencesOptionsContextType | undefined
>(undefined);

const getMyWordlistOptions = async (): Promise<MyWordlistOptions | null> => {
  const currentUnparsedOptions = await AsyncStorage.getItem('myWordlistOptions');
  if (!currentUnparsedOptions) return null;
  return JSON.parse(currentUnparsedOptions);
};

export const GenerateExampleSentencesOptionsProvider = ({
  children
}: {
  children: React.JSX.Element;
}) => {
  const [myWordlistOptions, setMyWordlistOptions] = useState<MyWordlistOptions>({});
  const { mergeItem: saveOption } = useAsyncStorage('myWordlistOptions');

  useEffect(() => {
    const applyOptionsFromStorage = async () => {
      const savedOptions = (await getMyWordlistOptions()) || {};
      setMyWordlistOptions(savedOptions);
    };

    applyOptionsFromStorage();
  }, []);

  const getSavedOptions = async () => {
    return await getMyWordlistOptions();
  };

  const saveThenSetExampleSentencesCEFRLevel = async (level: Level) => {
    await saveOption(JSON.stringify({ exampleSentencesCEFRlevel: level }));
    setMyWordlistOptions({ ...myWordlistOptions, exampleSentencesCEFRlevel: level });
  };

  const saveThenSetExplanationLanguage = async (language: NativeLanguage | undefined) => {
    let newOptions;
    const currentOptions = await getMyWordlistOptions();
    const currentOptionsClone = { ...currentOptions };

    if (!language) {
      delete currentOptionsClone.explanationLanguage;
      currentOptionsClone.generateExplanations = false;
      newOptions = { ...currentOptionsClone };
    } else {
      newOptions = { ...currentOptionsClone, explanationLanguage: language };
    }

    await AsyncStorage.setItem('myWordlistOptions', JSON.stringify(newOptions));
    const explanationLanguage = (await getMyWordlistOptions())?.explanationLanguage;
    const generateExplanations = (await getMyWordlistOptions())?.generateExplanations;

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
        myWordlistOptions,
        operations: {
          getSavedOptions,
          saveThenSetExampleSentencesCEFRLevel,
          saveThenSetExplanationLanguage,
          saveThenSetGenerateExplanations
        }
      }}
    >
      {children}
    </GenerateExampleSentencesOptionsContext.Provider>
  );
};
