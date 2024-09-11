import { MyWordlistOptions } from '../../types';
import { myWordlistOptionsVar } from '../reactiveVars';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Level, NativeLanguage } from '../__generated__/graphql';

const getMyWordlistOptions = async (): Promise<MyWordlistOptions | null> => {
  const currentUnparsedOptions = await AsyncStorage.getItem('myWordlistOptions');
  if (!currentUnparsedOptions) return null;
  return JSON.parse(currentUnparsedOptions);
};

export const useMyWordlistOptions = () => {
  const { mergeItem: saveOption } = useAsyncStorage('myWordlistOptions');
  const myWordlistOptions = useReactiveVar(myWordlistOptionsVar);

  useEffect(() => {
    const applyOptionsFromStorage = async () => {
      const savedOptions = (await getMyWordlistOptions()) || {};
      myWordlistOptionsVar(savedOptions);
    };

    applyOptionsFromStorage();
  }, []);

  const getSavedOptions = async () => {
    return await getMyWordlistOptions();
  };

  const saveThenSetExampleSentencesCEFRLevel = async (level: Level) => {
    await saveOption(JSON.stringify({ exampleSentencesCEFRlevel: level }));
    myWordlistOptionsVar({ ...myWordlistOptions, exampleSentencesCEFRlevel: level });
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

    myWordlistOptionsVar({
      ...myWordlistOptions,
      explanationLanguage,
      generateExplanations: !!generateExplanations
    });
  };

  const saveThenSetGenerateExplanations = async (generateExplanations: boolean) => {
    await saveOption(JSON.stringify({ generateExplanations }));
    myWordlistOptionsVar({ ...myWordlistOptions, generateExplanations });
  };

  const { exampleSentencesCEFRlevel, explanationLanguage, generateExplanations } =
    myWordlistOptions;

  return {
    operations: {
      getSavedOptions,
      saveThenSetExampleSentencesCEFRLevel,
      saveThenSetExplanationLanguage,
      saveThenSetGenerateExplanations
    },
    state: { exampleSentencesCEFRlevel, explanationLanguage, generateExplanations }
  };
};
