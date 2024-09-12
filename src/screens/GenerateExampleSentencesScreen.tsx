import { GenerateExampleSentencesOptionsProvider } from '../context-providers';
import { GenerateExampleSentencesScreenWrapper } from '../components';

export const GenerateExampleSentencesScreen = () => {
  return (
    <GenerateExampleSentencesOptionsProvider>
      <GenerateExampleSentencesScreenWrapper />
    </GenerateExampleSentencesOptionsProvider>
  );
};
