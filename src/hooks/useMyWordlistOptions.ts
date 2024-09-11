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

const getSavedExplanationLanguage = async () => (await getMyWordlistOptions())?.explanationLanguage;

const getSavedGenerateExplanations = async () =>
  (await getMyWordlistOptions())?.generateExplanations;

const getSavedExampleSentencesCEFRLevel = async () =>
  (await getMyWordlistOptions())?.exampleSentencesCEFRlevel;

export const useMyWordlistOptions = () => {
  const { getItem: getSavedOptions, mergeItem: saveOption } = useAsyncStorage('myWordlistOptions');
  const myWordlistOptions = useReactiveVar(myWordlistOptionsVar);

  useEffect(() => {
    const applyOptionsFromStorage = async () => {
      const unparsedSavedOptions = await getSavedOptions();
      const savedOptions = JSON.parse(unparsedSavedOptions || '{}');
      myWordlistOptionsVar(savedOptions);
    };

    applyOptionsFromStorage();
  }, []);

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
    const explanationLanguage = await getSavedExplanationLanguage();
    const generateExplanations = await getSavedGenerateExplanations();

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
      getSavedExampleSentencesCEFRLevel,
      getSavedOptions: async () => getMyWordlistOptions(),
      saveThenSetExampleSentencesCEFRLevel,
      saveThenSetExplanationLanguage,
      saveThenSetGenerateExplanations
    },
    state: { exampleSentencesCEFRlevel, explanationLanguage, generateExplanations }
  };
};
