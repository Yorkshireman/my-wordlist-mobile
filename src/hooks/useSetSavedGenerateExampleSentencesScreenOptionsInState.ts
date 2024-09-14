import { GenerateExampleSentencesOptionsContext } from '../contexts';
import { GenerateExampleSentencesOptionsContextType } from '../../types';
import { useContext, useEffect } from 'react';

export const useSetSavedGenerateExampleSentencesScreenOptionsInState = () => {
  const {
    operations: { getSavedOptions },
    state: { setOptions }
  } = useContext(
    GenerateExampleSentencesOptionsContext
  ) as GenerateExampleSentencesOptionsContextType;

  useEffect(() => {
    const setSavedOptionsInState = async () => {
      const savedOptions = (await getSavedOptions()) || {};
      setOptions(savedOptions);
    };

    setSavedOptionsInState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
