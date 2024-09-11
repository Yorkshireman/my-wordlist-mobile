import { MyWordlistOptions } from '../../types';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Level, NativeLanguage } from '../__generated__/graphql';
import { useEffect, useState } from 'react';

const getMyWordlistOptions = async (): Promise<MyWordlistOptions | null> => {
  const currentUnparsedOptions = await AsyncStorage.getItem('myWordlistOptions');
  if (!currentUnparsedOptions) return null;
  return JSON.parse(currentUnparsedOptions);
};

const getExampleSentencesCEFRlevel = async () =>
  (await getMyWordlistOptions())?.exampleSentencesCEFRlevel;

const getExplanationLanguage = async () => (await getMyWordlistOptions())?.explanationLanguage;
const getGenerateExplanations = async () => (await getMyWordlistOptions())?.generateExplanations;

export const useMyWordlistOptions = () => {
  const [exampleSentencesCEFRlevel, setExampleSentencesCEFRlevel] = useState<Level>();
  const [explanationLanguage, setExplanationLanguage] = useState<NativeLanguage | undefined>();
  const [generateExplanations, setGenerateExplanations] = useState<boolean>(false);
  const { mergeItem } = useAsyncStorage('myWordlistOptions');

  // get options from AsyncStorage on component mount and set in state
  useEffect(() => {
    getExampleSentencesCEFRlevel().then(level => setExampleSentencesCEFRlevel(level));
    getExplanationLanguage().then(language => setExplanationLanguage(language));
    getGenerateExplanations().then(generateExplanations =>
      setGenerateExplanations(!!generateExplanations)
    );
  }, []);

  const saveThenSetExampleSentencesCEFRLevel = async (level: Level) => {
    await mergeItem(JSON.stringify({ exampleSentencesCEFRlevel: level }));
    setExampleSentencesCEFRlevel(level);
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
    const explanationLanguage = await getExplanationLanguage();
    const generateExplanations = await getGenerateExplanations();
    setExplanationLanguage(explanationLanguage);
    setGenerateExplanations(!!generateExplanations);
  };

  const saveThenSetGenerateExplanations = async (generateExplanations: boolean) => {
    await mergeItem(JSON.stringify({ generateExplanations }));
    setGenerateExplanations(generateExplanations);
  };

  return {
    exampleSentencesCEFRlevel,
    explanationLanguage,
    generateExplanations,
    operations: {
      saveThenSetExampleSentencesCEFRLevel,
      saveThenSetExplanationLanguage,
      saveThenSetGenerateExplanations
    }
  };
};
