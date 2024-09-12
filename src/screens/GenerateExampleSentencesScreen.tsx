import {
  GenerateExampleSentencesOptionsProvider,
  GenerateExampleSentencesScreenWrapper
} from '../components';

export const GenerateExampleSentencesScreen = () => {
  return (
    <GenerateExampleSentencesOptionsProvider>
      <GenerateExampleSentencesScreenWrapper />
    </GenerateExampleSentencesOptionsProvider>
  );
};
