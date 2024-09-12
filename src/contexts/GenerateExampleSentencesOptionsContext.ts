import { createContext } from 'react';
import { GenerateExampleSentencesOptionsContextType } from '../../types';

export const GenerateExampleSentencesOptionsContext = createContext<
  GenerateExampleSentencesOptionsContextType | undefined
>(undefined);
