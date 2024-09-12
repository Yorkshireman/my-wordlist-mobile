import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Level, MyWordlist, NativeLanguage } from './src/__generated__/graphql';

export type AuthToken = string | null;

export type RootStackParamList = {
  CreateWordlistEntries: { wordlistId: string };
  EditWordlistEntry: { id: string };
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

export type GenerateExampleSentencesOptionsContextType = {
  myWordlistOptions: MyWordlistOptions;
  operations: {
    getSavedOptions: () => Promise<MyWordlistOptions | null>;
    saveThenSetExampleSentencesCEFRLevel: (level: Level) => Promise<void>;
    saveThenSetExplanationLanguage: (language: NativeLanguage | undefined) => Promise<void>;
    saveThenSetGenerateExplanations: (generateExplanations: boolean) => Promise<void>;
  };
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

export type MyWordlistOptions = {
  exampleSentencesCEFRlevel?: Level;
  explanationLanguage?: NativeLanguage;
  generateExplanations?: boolean;
};
