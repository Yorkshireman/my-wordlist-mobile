import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Level, MyWordlist, NativeLanguage } from './src/__generated__/graphql';

export type AuthToken = string | null;

export type RootStackParamList = {
  CreateWordlistEntries: { presentation?: string; wordlistId: string };
  EditWordlistEntry: { presentation?: string; id: string };
  ForgotYourPassword: undefined;
  GenerateExampleSentences: { wordId: string };
  Home: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type CreateWordlistEntriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateWordlistEntries'
>;

export type CreateWordlistEntryFormRouteParams = RouteProp<
  RootStackParamList,
  'CreateWordlistEntries'
>;

export type EditWordFormRouteParams = RouteProp<RootStackParamList, 'EditWordlistEntry'>;

export type EditWordlistEntryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditWordlistEntry'
>;

export type EditWordlistEntryScreenRouteParams = RouteProp<RootStackParamList, 'EditWordlistEntry'>;

export type ForgotYourPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotYourPassword'
>;

export type GenerateExampleSentencesOptionsContextType = {
  operations: {
    getSavedOptions: () => Promise<GenerateExampleSentencesScreenOptions | null>;
    saveThenSetExampleSentencesCEFRLevel: (level: Level) => Promise<void>;
    saveThenSetExplanationLanguage: (language: NativeLanguage | undefined) => Promise<void>;
    saveThenSetGenerateExplanations: (generateExplanations: boolean) => Promise<void>;
  };
  state: {
    options: GenerateExampleSentencesScreenOptions;
    setOptions: React.Dispatch<React.SetStateAction<GenerateExampleSentencesScreenOptions>>;
  };
};

export type GenerateExampleSentencesScreenOptions = {
  exampleSentencesCEFRlevel?: Level;
  explanationLanguage?: NativeLanguage;
  generateExplanations?: boolean;
};

export type GenerateExampleSentencesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GenerateExampleSentences'
>;

export type GenerateExampleSentencesScreenRouteParams = RouteProp<
  RootStackParamList,
  'GenerateExampleSentences'
>;

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>;

export type MyWordlistStorage = {
  generateExampleSentencesScreenOptions?: GenerateExampleSentencesScreenOptions;
};

export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export type UseFiltersReturnType = {
  anyFiltersApplied: boolean;
  myWordlist?: MyWordlist;
};

export type UseWordlistEntriesCreateProps = {
  currentAuthToken: AuthToken;
  unparsedCategoriesText: string;
  wordlistId: string;
  wordText: string;
};
